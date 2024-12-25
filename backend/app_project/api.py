"""
author: @bugmaster
date: 2022-02-07
function: 项目管理
"""
import hashlib
import logging
import os
import subprocess

import requests
from django.shortcuts import get_object_or_404
from ninja import File
from ninja import Router
from ninja.files import UploadedFile
from seldom import SeldomTestLoader
from seldom import TestMainExtend
from seldom.logging import log
from seldom.utils import file

from app_case.models import TestCase, TestCaseTemp
from app_project.models import Project, Env
from app_project.schema import ProjectIn, EnvIn, MergeCase
from app_task.models import TestTask
from app_utils.git_utils import LocalGitResource, is_valid_git_repo_url
from app_utils.module_utils import clear_test_modules
from app_utils.permission import check_permissions, PROJECT_PERMISSIONS, ENV_PERMISSIONS
from app_utils.project_utils import get_hash, copytree
from app_utils.response import response, Error, model_to_dict
from backend.settings import BASE_DIR, REPORT_DIR, DEBUG

logger = logging.getLogger('myapp')

# upload image
if DEBUG is True:
    IMAGE_DIR = os.path.join(BASE_DIR, "static", "images")
else:
    IMAGE_DIR = os.path.join(BASE_DIR, "staticfiles", "images")

router = Router(tags=["project"])


@router.post('/create')
@check_permissions(PROJECT_PERMISSIONS["CREATE"])
def create_project(request, project: ProjectIn):
    """
    创建项目
    """
    # 设置项目默认图片
    if project.cover_name == "" and project.path_name == "":
        project.cover_name = "seldom_logo.png"
        project.path_name = "2d82cb919cf05116adf720f8f7437ac9.png"
    # 设置默认目录
    if project.case_dir == "":
        project_case_dir = "test_dir"
    else:
        project_case_dir = project.case_dir

    # 检查项目地址是否可用
    if is_valid_git_repo_url(project.address) is False:
        return response(error=Error.PROJECT_ADDRESS_ERROR)

    project_obj = Project.objects.create(
        name=project.name,
        address=project.address,
        case_dir=project_case_dir,
        cover_name=project.cover_name,
        path_name=project.path_name)
    return response(result=model_to_dict(project_obj))


@router.get('/list')
def get_projects(request):
    """
    获取项目列表
    """
    projects = Project.objects.filter(is_delete=False)
    project_list = []
    for project in projects:
        # 本地项目地址
        local = LocalGitResource(project.name, project.address)
        # 判断本地是否有克隆文件
        if local.git_project_is_exists():
            project.is_clone = 1
            project.save()
        else:
            project.is_clone = 0
            project.save()
        project_list.append(model_to_dict(project))

    return response(result=project_list)


@router.get('/{project_id}/')
def get_project(request, project_id: int):
    """
    通过项目ID查询项目
    """
    project_obj = get_object_or_404(Project, pk=project_id, is_delete=False)
    return response(result=model_to_dict(project_obj))


@router.put('/{project_id}/')
@check_permissions(PROJECT_PERMISSIONS["CHANGE"])
def update_project(request, project_id: int, project: ProjectIn):
    """
    通过项目ID更新项目
    """
    if is_valid_git_repo_url(project.address) is False:
        return response(error=Error.PROJECT_ADDRESS_ERROR)

    project_obj = get_object_or_404(Project, pk=project_id)
    project_obj.name = project.name
    project_obj.address = project.address
    project_obj.case_dir = project.case_dir
    project_obj.cover_name = project.cover_name
    project_obj.path_name = project.path_name
    project_obj.save()
    return response(result=model_to_dict(project_obj))


@router.delete('/{project_id}/')
@check_permissions(PROJECT_PERMISSIONS["DELETE"])
def delete_project(request, project_id: int):
    """
    通过项目ID删除项目
    """
    project_obj = get_object_or_404(Project, pk=project_id)
    project_obj.is_delete = True
    project_obj.save()

    return response()


@router.get('/{project_id}/sync_code')
def async_project_code(request, project_id: int):
    """
    第一步：git克隆&拉取项目代码
    默认克隆： seldom-api-testing -> 复制 seldom-api-testing_a 和 seldom-api-testing_b
    """
    project = get_object_or_404(Project, pk=project_id)

    # 本地git项目资源
    local = LocalGitResource(project.name, project.address)

    # 判断项目是否存在
    if local.git_project_is_exists():
        logger.info(f"==> git pull {project.address}")
        res = subprocess.check_call(["git", "pull"], cwd=local.git_project_dir())
        if res == 0:
            # 获取文件数量
            test_num = 0
            for _, _, filenames in os.walk(local.git_project_dir()):
                file_counts = len(filenames)
                test_num += file_counts

            project.test_num = test_num
            project.save()
            return response()
        else:
            return response(error=Error.PROJECT_CLONE_ERROR)
    else:
        logger.info(f"==> git clone {project.address}")
        res = subprocess.check_call(["git", "clone", project.address], cwd=local.project_dir)
        if res == 0:
            # 获取文件数量
            test_num = 0
            for _, _, filenames in os.walk(local.git_project_dir()):
                file_counts = len(filenames)
                test_num += file_counts

            # 复制项目
            source_project = local.git_project_dir()
            blue_project = local.git_project_dir(suffix="blue")
            green_project = local.git_project_dir(suffix="green")
            copytree(source_project, blue_project)
            copytree(source_project, green_project)

            logger.info("save clone project data")
            project.test_num = test_num
            project.is_clone = 1
            project.run_version = "blue"
            project.save()

            return response()
        else:
            return response(error=Error.PROJECT_CLONE_ERROR)


@router.get("/{project_id}/sync_case")
def sync_project_case(request, project_id: int):
    """
    第二步：同步项目用例
    """
    project = get_object_or_404(Project, pk=project_id)

    local = LocalGitResource(project.name, project.address)
    project_root_dir = local.git_project_dir(suffix=project.run_version)

    project_test_dir = file.join(project_root_dir, project.case_dir)
    if os.path.isdir(project_test_dir) is False:
        return response(error=Error.PROJECT_DIR_NULL)

    # * 清除测试模块
    clear_test_modules(project_test_dir)
    # 添加环境变量
    file.add_to_path(project_root_dir)

    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True
    SeldomTestLoader.collectCaseList = []

    main_extend = TestMainExtend(path=project_test_dir)
    seldom_case = main_extend.collect_cases(warning=True)

    TestCaseTemp.objects.filter(project=project).delete()

    case_hash_list = []
    # 从seldom项目中找到新增的用例
    for seldom in seldom_case:
        case_hash = get_hash(f"""{project_id}.{seldom["file"]}.{seldom["class"]["name"]}.{seldom["method"]["name"]}""")
        if case_hash not in case_hash_list:
            try:
                label = seldom["method"]["label"]
            except KeyError as msg:
                log.error(msg)
                label = ""

            case_hash_list.append(case_hash)
            TestCaseTemp.objects.create(
                project_id=project_id,
                file_name=seldom["file"],
                class_name=seldom["class"]["name"],
                class_doc=seldom["class"]["doc"],
                case_name=seldom["method"]["name"],
                case_doc=seldom["method"]["doc"],
                label=label,
                case_hash=case_hash
            )

    return response()


@router.get("/{project_id}/sync_result")
def async_project_result(request, project_id: int):
    """
    第三步：同步项目用例结果
    """
    project_obj = get_object_or_404(Project, pk=project_id)

    temp_case = TestCaseTemp.objects.filter(project=project_obj)
    project_case = TestCase.objects.filter(project=project_obj)

    # 用例备份表中找到新增的用例
    add_case = []
    del_case = []
    for temp in temp_case:
        for project in project_case:
            if temp.case_hash == project.case_hash:
                break
        else:
            add_case.append({
                "file_name": temp.file_name,
                "class_name": temp.class_name,
                "class_doc": temp.class_doc,
                "case_name": temp.case_name,
                "case_doc": temp.case_doc,
                "case_hash": temp.case_hash,
                "label": temp.label,
            })

    # 项目用例表找出已删除的用例
    for project in project_case:
        for temp in temp_case:
            if project.case_hash == temp.case_hash:
                break
        else:
            del_case.append({
                "file_name": project.file_name,
                "class_name": project.class_name,
                "class_doc": project.class_doc,
                "case_name": project.case_name,
                "case_doc": project.case_doc,
                "case_hash": project.case_hash,
                "label": project.label,
            })

    return response(result={"project_id": project_id, "add_case": add_case, "del_case": del_case})


@router.post("/{project_id}/sync_merge")
def async_project_merge(request, project_id: int, param: MergeCase):
    """
    第四步：合并用例
    """
    project = get_object_or_404(Project, pk=project_id)

    # 添加用例
    add_case = param.add_case
    del_case = param.del_case
    for case in add_case:
        TestCase.objects.create(
            project=project,
            file_name=case["file_name"],
            class_name=case["class_name"],
            class_doc=case["class_doc"],
            case_name=case["case_name"],
            case_doc=case["case_doc"],
            case_hash=case["case_hash"],
            label=case["label"]
        )

    # 删除用例
    for case in del_case:
        test_case = TestCase.objects.get(project=project, case_hash=case["case_hash"])
        test_case.delete()

    local = LocalGitResource(project.name, project.address)
    project_root_dir = local.git_project_dir()
    if project.run_version == "blue":
        target_project = local.git_project_dir(suffix="green")
        project.run_version = "green"
    else:
        target_project = local.git_project_dir(suffix="blue")
        project.run_version = "blue"
    # 合并代码
    copytree(project_root_dir, target_project)

    # 更新蓝&绿
    project.save()

    return response()


@router.get("/sync_log")
def get_async_log(request):
    """
    获得同步日志.
    注：暂时无法支持不同的项目，只记录最新的同步错误日志。
    """
    sync_log_file = os.path.join(REPORT_DIR, "collect_warning.log")
    with open(sync_log_file, "r") as f:
        log = f.read()
        return response(result={"log": log})


@router.post("/upload", auth=None)
def upload_project_image(request, file: UploadedFile = File(...)):
    """
    项目图片上传
    """
    # 判断文件后缀名
    suffix = file.name.split(".")[-1]
    if suffix not in ["png", "jpg", "jpeg", "gif"]:
        return response(error=Error.FILE_TYPE_ERROR)

    # 判断文件大小 1024 * 1024 * 2 = 2MB
    if file.size > 2097152:
        return response(error=Error.FILE_SIZE_ERROR)

    # 文件名生成md5
    file_md5 = hashlib.md5(bytes(file.name, encoding="utf8")).hexdigest()
    file_name = file_md5 + "." + suffix

    # 保存到本地
    upload_file = os.path.join(IMAGE_DIR, file_name)
    with open(upload_file, 'wb+') as f:
        for chunk in file.chunks():
            f.write(chunk)

    return response(result={"name": file_name})


# @router.put("/cover/remove/{project_id}/", auth=None)
# def remove_project_image(request, project_id: int):
#     """
#     后续有具体删除需求备用
#     项目图片删除
#     """
#     project_obj = get_object_or_404(Project, pk=project_id)
#     project_obj.cover_name = ""
#     project_obj.path_name = ""
#     project_obj.save()
#     return response()


@router.get("/{project_id}/files")
def get_project_files(request, project_id: int):
    """
    获取项目用例文件列表
    """
    cases = TestCase.objects.filter(project_id=project_id)
    case_number = len(cases)
    files = []
    files_name = []
    for case in cases:
        if "." in case.file_name:
            case_path = case.file_name.split('.')
        else:
            case_path = [case.file_name + ".py"]

        if case_path[0] not in files_name:
            files_name.append(case_path[0])
            if ".py" in case_path[0]:
                case_level_one = {
                    "label": case_path[0],
                    "full_name": case_path[0],
                    "is_leaf": 1,
                    "leaf": True
                }
            else:
                case_level_one = {
                    "label": case_path[0],
                    "full_name": case_path[0],
                    "is_leaf": 0,
                    "children": []
                }

            files.append(case_level_one)

    return response(result={"case_number": case_number, "files": files})


@router.get('/{project_id}/cases')
def get_project_file_cases(request, project_id: int, file_name: str):
    """
    获取文件下面的测试用例
    """
    # 如果是文件，直接取文件的类、方法
    if ".py" in file_name:
        file_cases = TestCase.objects.filter(
            project_id=project_id,
            file_name=file_name[0:-3]
        )
        case_list = []
        for case in file_cases:
            case_list.append(model_to_dict(case))

        return response(result=case_list)

    return response()


@router.get('/{project_id}/subdirectory')
def get_project_subdirectory(request, project_id: int, file_name: str):
    """
    获取子目录
    """
    all_cases = TestCase.objects.filter(project_id=project_id)
    files_name = []
    for case in all_cases:
        if case.file_name.startswith(file_name + ".") is True:
            if case.file_name[len(file_name + "."):] not in files_name:
                files_name.append(case.file_name[len(file_name + "."):])

    case_name = []
    dir_name = []
    for f_name in files_name:
        if "." in f_name:
            case_path = f_name.split('.')
            if case_path[0] not in dir_name:
                dir_name.append(case_path[0])
            else:
                continue
            case_level_two = {
                "label": case_path[0],
                "full_name": file_name + "." + case_path[0],
                "is_leaf": 0,
                "children": []
            }
        else:
            case_path = [f_name + ".py"]
            case_level_two = {
                "label": case_path[0],
                "full_name": file_name + "." + case_path[0],
                "is_leaf": 1,
                "leaf": True
            }
        case_name.append(case_level_two)

    return response(result=case_name)


@router.post('/env')
@check_permissions(ENV_PERMISSIONS["CREATE"])
def create_env(request, env: EnvIn):
    """
    创建环境
    """
    project_obj = Env.objects.create(
        name=env.name,
        test_type=env.test_type,
        env=env.env,
        rerun=env.rerun,
        is_clear_cache=env.is_clear_cache,
        browser=env.browser,
        base_url=env.base_url,
        remote=env.remote,
        app_server=env.app_server,
        app_info=env.app_info
    )
    return response(result=model_to_dict(project_obj))


@router.get('/env/{env_id}/')
def get_env(request, env_id: int):
    """
    获取环境
    """
    try:
        env = Env.objects.get(id=env_id, is_delete=False)
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response(result=model_to_dict(env))


@router.get('/env/list')
def get_env_list(request):
    """
    获取环境列表
    """
    envs = Env.objects.filter(is_delete=False)
    env_list = []
    for env in envs:
        env_list.append(model_to_dict(env))
    return response(result=env_list)


@router.delete('/env/{env_id}/')
@check_permissions(ENV_PERMISSIONS["DELETE"])
def delete_env(request, env_id: int):
    """
    删除环境
    """
    task = TestTask.objects.filter(env_id=env_id, is_delete=False)
    if len(task) > 0:
        return response(error=Error.ENV_IN_USE)

    try:
        env = Env.objects.get(id=env_id)
        env.is_delete = True
        env.save()
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response()


@router.put('/env/{env_id}/')
@check_permissions(ENV_PERMISSIONS["CHANGE"])
def update_env(request, env_id: int, env: EnvIn):
    """
    更新环境
    """
    try:
        env_obj = Env.objects.get(id=env_id)
        env_obj.name = env.name
        env_obj.test_type = env.test_type
        env_obj.env = env.env
        env_obj.rerun = env.rerun
        env_obj.is_clear_cache = env.is_clear_cache
        env_obj.browser = env.browser
        env_obj.base_url = env.base_url
        env_obj.remote = env.remote
        env_obj.app_server = env.app_server
        env_obj.app_info = env.app_info
        env_obj.save()
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response()
