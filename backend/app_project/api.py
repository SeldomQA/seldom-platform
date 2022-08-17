"""
author: @bugmaster
date: 2022-02-07
function: 项目管理
"""
import os
import hashlib
import subprocess
from django.shortcuts import get_object_or_404
from ninja import File
from ninja import Router
from ninja.files import UploadedFile
from seldom import SeldomTestLoader
from seldom import TestMainExtend
from seldom.utils import file
from app_project.models import Project, Env
from app_project.api_schma import ProjectIn, EnvIn
from app_case.models import TestCase
from app_utils.response import response, Error, model_to_dict
from backend.settings import BASE_DIR
from random import randint

# upload image
IMAGE_DIR = os.path.join(BASE_DIR, "static", "images")

router = Router(tags=["project"])


@router.post('/create')
def create_project(request, project: ProjectIn):
    """
    创建项目
    """
    # 设置项目默认图片
    if project.cover_name == "" and project.path_name == "":
        project.cover_name = "seldom_logo.png"
        project.path_name = "2d82cb919cf05116adf720f8f7437ac9.png"

    project_obj = Project.objects.create(
        name=project.name,
        address=project.address,
        case_dir=project.case_dir,
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
def update_project(request, project_id: int, project: ProjectIn):
    """
    通过项目ID更新项目
    """
    project_obj = get_object_or_404(Project, pk=project_id)
    project_obj.name = project.name
    project_obj.address = project.address
    project_obj.case_dir = project.case_dir
    project_obj.cover_name = project.cover_name
    project_obj.path_name = project.path_name
    project_obj.save()
    return response(result=model_to_dict(project_obj))


@router.get('/{project_id}/clone')
def clone_project(request, project_id: int):
    """
    git克隆项目到本地
    """
    project_obj = get_object_or_404(Project, pk=project_id)
    if "/" not in project_obj.address:
        return response(error=Error.PROJECT_ADDRESS_ERROR)

    # 项目名
    project_name = project_obj.address.split("/")[-1].replace(".git", "")
    # 本地github地址
    local_github_dir = file.join(BASE_DIR, "github")
    # 本地项目地址
    project_address = file.join(local_github_dir, project_name)

    if os.path.isdir(project_address) is False:
        args = ["clone", project_obj.address]
        res = subprocess.check_call(['git'] + list(args), cwd=local_github_dir)
        if res == 0:
            return response()
        else:
            return response(error=Error.PROJECT_CLONE_ERROR)
    else:
        args = ["pull"]
        res = subprocess.check_call(['git'] + list(args), cwd=project_address)
        if res == 0:
            return response()
        else:
            return response(error=Error.PROJECT_CLONE_ERROR)


@router.delete('/{project_id}/')
def delete_project(request, project_id: int):
    """
    通过项目ID删除项目
    """
    project_obj = get_object_or_404(Project, pk=project_id)
    project_obj.is_delete = True
    project_obj.save()

    return response()


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


@router.get("/{project_id}/sync")
def update_project_cases(request, project_id: int):
    """
    同步项目用例
    """
    project_obj = get_object_or_404(Project, pk=project_id)

    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True

    # 项目本地目录
    project_name = project_obj.address.split("/")[-1].replace(".git", "")
    github_dir = file.join(BASE_DIR, "github")
    project_address = file.join(github_dir, project_name)

    # 把项目目录加到环境变量path
    file.add_to_path(project_address)

    test_dir = file.join(project_address, project_obj.case_dir)

    if os.path.isdir(test_dir) is False:
        return response(error=Error.PROJECT_DIR_NULL)

    # 收集测试用例信息
    main_extend = TestMainExtend(path=test_dir)
    seldom_case = main_extend.collect_cases(json=False)
    print(seldom_case)

    platform_case = TestCase.objects.filter(project=project_obj)
    print("platform_case", platform_case)

    # 从seldom项目中找到新增的用例
    for seldom in seldom_case:
        for platform in platform_case:
            if (seldom["file"] == platform.file_name
                    and seldom["class"]["name"] == platform.class_name
                    and seldom["method"]["name"] == platform.case_name):
                break
        else:
            print("seldom-file--->", seldom)
            print("seldom-file--->", seldom["file"])
            TestCase.objects.create(
                project_id=project_id,
                file_name=seldom["file"],
                class_name=seldom["class"]["name"],
                class_doc=seldom["class"]["doc"],
                case_name=seldom["method"]["name"],
                case_doc=seldom["method"]["doc"],
            )

    # 从platform找出已删除的用例
    for platform in platform_case:
        for seldom in seldom_case:
            if (platform.file_name == seldom["file"]
                    and platform.class_name == seldom["class"]["name"]
                    and platform.case_name == seldom["method"]["name"]):
                break
        else:
            test_case = TestCase.objects.filter(project=project_obj, id=platform.id)
            test_case.delete()

    return response()


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
                    "children": []
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
def get_project_file_cases(request, project_id: int, file_name: str, audit: bool = None):
    """
    获取文件下面的测试用例
    """
    # 如果是文件，直接取文件的类、方法
    if ".py" in file_name:
        if audit is not None:
            file_cases = TestCase.objects.filter(
                project_id=project_id,
                file_name=file_name[0:-3],
                audit=audit,
            )
        else:
            file_cases = TestCase.objects.filter(
                project_id=project_id,
                file_name=file_name[0:-3]
            )
        case_list = []
        for case in file_cases:
            case_list.append(model_to_dict(case))
        # 通过接口返回
        if len(case_list) == 0:
            return response(error=Error.CASE_AUDIT_NULL)

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
                "children": []
            }
        case_name.append(case_level_two)

    return response(result=case_name)


@router.post('/env')
def create_env(request, env: EnvIn):
    """
    创建环境
    """
    project_obj = Env.objects.create(
        name=env.name,
        env=env.env,
        browser=env.browser,
        base_url=env.base_url)
    return response(result=model_to_dict(project_obj))


@router.get('/env/{env_id}/')
def get_env(request, env_id: int):
    """
    获取环境
    """
    try:
        env = Env.objects.get(id=env_id)
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response(result=model_to_dict(env))


@router.get('/env/list')
def get_env_list(request):
    """
    获取环境列表
    """
    envs = Env.objects.all()
    env_list = []
    for env in envs:
        env_list.append(model_to_dict(env))
    return response(result=env_list)


@router.delete('/env/{env_id}/')
def delete_env(request, env_id: int):
    """
    删除环境
    """
    try:
        env = Env.objects.get(id=env_id)
        env.delete()
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response()


@router.put('/env/{env_id}/')
def update_env(request, env_id: int, env: EnvIn):
    """
    更新环境
    """
    try:
        env_obj = Env.objects.get(id=env_id)
        env_obj.name = env.name
        env_obj.env = env.env
        env_obj.browser = env.browser
        env_obj.base_url = env.base_url
        env_obj.save()
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response()
