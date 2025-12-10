import json
import logging
import threading
import time
from typing import List

import requests
from django.shortcuts import get_object_or_404
from ninja import Router
from ninja.pagination import paginate
from seldom.utils import file

from app_case.models import TestCase
from app_project.models import Project, Env
from app_project.models import Team
from app_task.models import TestTask, TaskCaseRelevance, TaskReport, ReportDetails
from app_task.running import seldom_running
from app_task.schema import *
from app_utils.git_utils import LocalGitResource
from app_utils.module_utils import clear_test_modules
from app_utils.pagination import CustomPagination
from app_utils.response import response, model_to_dict, Error
from backend.config import THIS_SERVER, TIMED_SERVER

router = Router(tags=["task"])


@router.post('/create')
def create_task(request, task: TaskIn):
    """
    创建任务
    """
    task_obj = TestTask.objects.create(
        name=task.name,
        env_id=task.env_id,
        team_id=task.team_id,
        project_id=task.project,
    )

    for case in task.cases:
        TaskCaseRelevance.objects.create(task=task_obj, case_hash=case)

    task_dict = model_to_dict(task_obj)
    task_dict["cases"] = task.cases
    return response(result=task_dict)


@router.get('/{task_id}/')
def get_task(request, task_id: int):
    """
    获得任务详情
    """
    task_obj = TestTask.objects.get(id=task_id)
    relevance = TaskCaseRelevance.objects.filter(task=task_obj)
    cases = []
    for r in relevance:
        cases.append(r.case_hash)

    case_list = []
    for c in cases:
        try:
            case_obj = TestCase.objects.get(case_hash=c)
            case_list.append({
                "key": case_obj.case_hash,
                "label": case_obj.class_name + "." + case_obj.case_name
            })
        except TestCase.DoesNotExist as e:
            pass
    task_dict = model_to_dict(task_obj)

    env = Env.objects.get(id=task_obj.env_id)
    task_dict["env"] = env.id
    task_dict["cases"] = cases
    task_dict["case_list"] = case_list
    return response(result=task_dict)


@router.get('/list', response=List[TaskOut])
@paginate(CustomPagination)
def get_task_list(request, project_id: int, team_id: str = None, name: str = None):
    """
    获得任务列表
    """

    query = {"project_id": project_id}
    if team_id is not None and team_id != "":
        query["team_id"] = int(team_id)
    if name is not None and name != "":
        query["name__contains"] = name

    tasks = TestTask.objects.filter(**query, is_delete=False).order_by("-create_time")[:1000]

    task_list = []
    for task in tasks:
        task_dict = model_to_dict(task)
        task_dict["project_id"] = task.project_id
        if task_dict["email"] is None:
            task_dict["email"] = ""
        try:
            task_dict["env"] = Env.objects.get(id=task.env_id).name
        except Env.DoesNotExist:
            task_dict["env"] = ""

        try:
            task_dict["team"] = Team.objects.get(id=task.team_id).name
        except Team.DoesNotExist:
            task_dict["team"] = ""

        if task_dict["timed"] == "":
            task_dict["timed_status"] = ""
            task_dict["timed_conf"] = {}
        else:
            timed = json.loads(task_dict["timed"])
            task_dict["timed_status"] = timed["status"]
            task_dict["timed_conf"] = timed["cron_job"]

        task_list.append(task_dict)

    return task_list


@router.put('/{task_id}/')
def update_task(request, task_id: int, task: TaskIn):
    """
    更新任务
    """
    task_obj = TestTask.objects.get(id=task_id)
    task_obj.name = task.name
    task_obj.env_id = task.env_id
    task_obj.team_id = task.team_id
    task_obj.save()

    TaskCaseRelevance.objects.filter(task=task_obj).delete()
    for case in task.cases:
        TaskCaseRelevance.objects.create(task=task_obj, case_hash=case)

    task_dict = model_to_dict(task_obj)
    task_dict["cases"] = task.cases
    return response(result=task_dict)


@router.delete('/{task_id}/')
def delete_task(request, task_id: int):
    """
    删除任务
    """
    # 更新删除状态
    task_obj = get_object_or_404(TestTask, pk=task_id)
    task_obj.is_delete = True
    task_obj.save()
    # 删除关联
    TaskCaseRelevance.objects.filter(task=task_obj).delete()

    return response()


@router.get("/{task_id}/running", auth=None)
def running_task(request, task_id: int):
    """
    运行任务
    """
    # 保存定时任务格式
    task = TestTask.objects.get(id=task_id)
    if task.status == 1:
        return response(error=Error.TASK_RUNNING)

    relevance = TaskCaseRelevance.objects.filter(task_id=task_id)
    case_list = []
    for r in relevance:
        case = TestCase.objects.get(case_hash=r.case_hash)
        case_list.append({
            "file": case.file_name,
            "class": {
                "name": case.class_name,
                "doc": case.class_doc
            },
            "method": {
                "name": case.case_name,
                "doc": case.case_doc
            }
        })

    # 项目目录添加环境变量
    project = Project.objects.get(id=task.project_id)

    # 项目相关目录
    local = LocalGitResource(project.name, project.address)
    project_root_dir = local.git_project_dir(suffix=project.run_version)
    project_case_dir = file.join(project_root_dir, project.case_dir)

    # * 清除测试模块
    clear_test_modules(project_case_dir)
    # 添加环境变量
    file.add_to_path(project_root_dir)

    # 定义报告
    report_name = f'{task.id}_{str(time.time()).split(".")[0]}.xml'

    # 丢给线程执行用例
    threads = []
    t = threading.Thread(target=seldom_running, args=(project_case_dir, case_list, report_name, task_id,))
    threads.append(t)
    for t in threads:
        t.start()

    return response()


@router.get("/reports", response=List[ReportOut])
@paginate(CustomPagination)
def get_report_list(request, task_id: int):
    """
    获得任务报告列表（分页）
    """
    if task_id == 0:
        return response(error=Error.TASK_ID_NULL)
    return TaskReport.objects.filter(task_id=task_id).order_by("-create_time")[:1000]


@router.post("/report/{report_id}/results")
def get_result_list(request, report_id: int, result: ReportIn):
    """
    获得任务报告的详细信息
    """
    results = ReportDetails.objects.filter(result_id=report_id).order_by("-create_time")
    result_list = []
    for r in results:
        result_dict = model_to_dict(r)
        if result.type == "error":
            if result_dict["error_out"] != "":
                result_list.append(result_dict)
        elif result.type == "failure":
            if result_dict["failure_out"] != "":
                result_list.append(result_dict)
        elif result.type == "skipped":
            if result_dict["skipped_message"] != "":
                result_list.append(result_dict)
        elif result.type == "success":
            if (result_dict["skipped_message"] == ""
                    and result_dict["error_out"] == ""
                    and result_dict["failure_out"] == ""):
                result_list.append(result_dict)
        else:
            result_list.append(result_dict)

    return response(result=result_list)


@router.post('/timed/create')
def create_timed(request, timed: TimedIn):
    """
    创建定时任务
    """
    url = f"{TIMED_SERVER}/scheduler/cron/add_job"
    cron_job = {
        "job_id": f"cron_task_{timed.task_id}",
        "url": f"{THIS_SERVER}/api/task/{timed.task_id}/running",
        "second": timed.second,
        "minute": timed.minute,
        "hour": timed.hour,
        "day": timed.day,
        "month": timed.month,
        "day_of_week": timed.day_of_week
    }
    logging.info(f"add timed task:[url]{url}, [cron_job]{cron_job}")
    try:
        resp = requests.post(url=url, json=cron_job)
    except requests.exceptions.ConnectionError:
        return response(error=Error.TIMED_TASK_FAILED)

    if resp.status_code != 200:
        logging.error("add crontab job fail")
        return response(error=Error.TIMED_ADD_FAILED)

    task_obj = TestTask.objects.get(id=timed.task_id)
    task_obj.timed = json.dumps({
        "status": "running",
        "cron_job": cron_job
    })
    task_obj.save()

    return response()


@router.put('/timed/switch')
def switch_timed(request, task_id: int):
    """
    暂停/恢复定时任务
    """
    task_obj = TestTask.objects.get(id=task_id)
    timed = json.loads(task_obj.timed)
    status = timed["status"]
    if status == "running":
        new_status = "pause"
        url = f"{TIMED_SERVER}/scheduler/pause_job?job_id=cron_task_{task_id}"
    else:
        new_status = "running"
        url = f"{TIMED_SERVER}/scheduler/resume_job?job_id=cron_task_{task_id}"
    try:
        resp = requests.put(url=url)
    except requests.exceptions.ConnectionError:
        return response(error=Error.TIMED_TASK_FAILED)

    if resp.status_code != 200:
        logging.error("pause/resume crontab job fail")
        return response(error=Error.TIMED_UPDATE_FAILED)

    timed["status"] = new_status
    task_obj.timed = json.dumps({
        "status": timed["status"],
        "cron_job": timed["cron_job"]
    })
    task_obj.save()

    return response()


@router.delete('/timed/delete')
def delete_timed(request, task_id: int):
    """
    删除定时任务
    """
    url = f"{TIMED_SERVER}/scheduler/remove_job?job_id=cron_task_{task_id}"

    try:
        resp = requests.delete(url=url)
    except requests.exceptions.ConnectionError:
        return response(error=Error.TIMED_TASK_FAILED)

    if resp.status_code != 200:
        logging.error("delete crontab job fail")
        return response(error=Error.TIMED_DEL_FAILED)

    task_obj = TestTask.objects.get(id=task_id)
    task_obj.timed = ""
    task_obj.save()

    return response()
