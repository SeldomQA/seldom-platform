import os
import time
import threading
from typing import List
from seldom.utils import file
from ninja import Router
from ninja.pagination import paginate
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers import SchedulerAlreadyRunningError
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
from app_project.models import Project, Env
from app_case.models import TestCase
from app_task.models import TestTask, TaskCaseRelevance, TaskReport, ReportDetails
from app_team.models import Team
from app_task.api_schma import TaskIn, TimedIn, ReportOut, ReportIn
from app_task.api_utils import thread_run_task
from app_utils.response import response, model_to_dict, Error
from app_utils.pagination import CustomPagination
from backend.settings import BASE_DIR


# 定时任务
scheduler = BackgroundScheduler()
# scheduler.add_jobstore(DjangoJobStore(), 'default')


router = Router(tags=["task"])


@router.post('/create')
def create_task(request, task: TaskIn):
    """
    创建任务
    """
    task_obj = TestTask.objects.create(
        name=task.name,
        env_id=task.env_id,
        project_id=task.project,
    )

    for case in task.cases:
        TaskCaseRelevance.objects.create(task=task_obj, case_id=case)

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
        cases.append(r.case_id)

    case_list = []
    for c in cases:
        case_obj = TestCase.objects.get(id=c)
        case_list.append({
            "key": case_obj.id,
            "label": str(case_obj.id) + " " + case_obj.class_name + "." + case_obj.case_name
        })
    task_dict = model_to_dict(task_obj)

    env = Env.objects.get(id=task_obj.env_id)
    task_dict["env"] = env.id
    task_dict["cases"] = cases
    task_dict["case_list"] = case_list
    return response(result=task_dict)


@router.get('/list')
def get_task_list(request, project_id: int, team_id: str = None, name: str = None):
    """
    获得任务列表
    """

    query = {"project_id": project_id}
    if team_id is not None and team_id != "":
        query["team_id"] = int(team_id)
    if name is not None and name != "":
        query["name__contains"] = name

    tasks = TestTask.objects.filter(**query)

    task_list = []
    for task in tasks:
        task_dict = model_to_dict(task)
        try:
            env = Env.objects.get(id=task.env_id)
            task_dict["env"] = env.name
        except Env.DoesNotExist:
            task_dict["env"] = ""

        try:
            team = Team.objects.get(id=task.team_id)
            task_dict["team"] = team.name
        except team.DoesNotExist:
            task_dict["team"] = ""

        if task_dict["timed"] == "":
            task_dict["timed_dict"] = {
                "minute": "*", "hour": "*", "day_of_week": "*", "day": "*", "month": "*"
            }
        else:
            t = task_dict["timed"].split(" ")
            task_dict["timed_dict"] = {
                "minute": t[0], "hour": t[1], "day_of_week": t[2], "day": t[3], "month": t[4]
            }
        task_list.append(task_dict)
    return response(result=task_list)


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
        TaskCaseRelevance.objects.create(task=task_obj, case_id=case)

    task_dict = model_to_dict(task_obj)
    task_dict["cases"] = task.cases
    return response(result=task_dict)


@router.delete('/{task_id}/')
def delete_task(request, task_id: int):
    """
    删除任务
    """
    task_obj = TestTask.objects.get(id=task_id).delete()
    TaskCaseRelevance.objects.filter(task=task_obj).delete()

    return response()


@router.post("/{task_id}/running")
def running_task(request, task_id: int):
    """
    运行任务
    """
    # 保存定时任务格式
    task = TestTask.objects.get(id=task_id)

    relevance = TaskCaseRelevance.objects.filter(task_id=task_id)
    case_list = []
    for r in relevance:
        case = TestCase.objects.get(id=r.case_id)
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

    project_dir = file.join(BASE_DIR, "github", project.address.split("/")[-1])
    file.add_to_path(project_dir)
    test_dir = file.join(project_dir, project.case_dir)

    if os.path.exists(test_dir) is False:
        return response(error=Error.CASE_DIR_ERROR)

    # 定义报告
    report_name = f'{task.name}_{str(time.time()).split(".")[0]}.xml'

    # 丢给线程执行用例
    threads = []
    t = threading.Thread(target=thread_run_task, args=(test_dir, case_list, report_name, task_id,))
    threads.append(t)
    for t in threads:
        t.start()

    return response()


@router.post("/{task_id}/timed")
def add_timed(request, task_id: int, timed: TimedIn):
    """
    添加任务的定时
    year='*', month='*', day=1, week='*', day_of_week='*', hour='*', minute=20, second=0
    """
    # 保存定时任务格式
    task = TestTask.objects.get(id=task_id)
    relevance = TaskCaseRelevance.objects.filter(task_id=task_id)
    case_list = []
    for r in relevance:
        case = TestCase.objects.get(id=r.case_id)
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

    # 测试用例目录
    project = Project.objects.get(id=task.project_id)
    project_dir = file.join(BASE_DIR, "github", project.address.split("/")[-1])
    test_dir = file.join(project_dir, project.case_dir)
    if os.path.exists(test_dir) is False:
        return response(error=Error.CASE_DIR_ERROR)

    # 定义报告
    report_name = f'{task.name}_{str(time.time()).split(".")[0]}.xml'
    # 如果创建了定时任务先移除
    timed_job = scheduler.get_job(job_id=task.job_id)
    if timed_job is not None:
        scheduler.pause_job(job_id=task.job_id)
        scheduler.remove_job(job_id=task.job_id)

    # 添加定时任务
    job_id = scheduler.add_job(thread_run_task, 'cron', args=[test_dir, case_list, report_name, task_id],
                               minute=timed.minute,
                               hour=timed.hour,
                               day_of_week=timed.day_of_week,
                               day=timed.day,
                               month=timed.month,
                               misfire_grace_time=300,
                               coalesce=True,
                               max_instances=1,
                               replace_existing=True,
                               )

    try:
        scheduler.start()
    except SchedulerAlreadyRunningError:
        ...

    task.job_id = job_id.id
    task.timed = f"""{timed.minute} {timed.hour} {timed.day_of_week} {timed.day} {timed.month}"""
    task.save()

    return response(result=[])


@router.delete("/{task_id}/timed", )
def delete_timed(request, task_id: int):
    """
    删除任务的定时
    """
    task = TestTask.objects.get(id=task_id)

    timed_job = scheduler.get_job(job_id=task.job_id)
    if timed_job is not None:
        scheduler.pause_job(job_id=task.job_id)
        scheduler.remove_job(job_id=task.job_id)

    task.timed = ""
    task.job_id = ""
    task.save()

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
