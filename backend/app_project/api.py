"""
author: @bugmaster
date: 2022-02-07
function: 项目管理
"""
import os
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from ninja import Router
from utils.response import response, Error
from seldom import SeldomTestLoader
from seldom import TestMainExtend
from seldom.utils import file
from ninja import Schema
from app_project.models import Project, Case


# seldom自动化项目用例路径（seldom-web-testing）
TEST_DIR = os.path.join(file.dir_dir_dir, "seldom-web-testing", "test_dir")

router = Router(tags=["project"])


class ProjectItems(Schema):
    name: str
    address: str


@router.post('/create')
def create_project(request, project: ProjectItems):
    """
    创建项目
    """
    project_obj = Project.objects.create(name=project.name, address=project.address)
    return response(data=model_to_dict(project_obj))


@router.get('/list')
def get_projects(request):
    """
    获取项目列表
    """
    projects = Project.objects.filter(is_delete=False)
    project_list = []
    for project in projects:
        project_list.append(model_to_dict(project))
    return response(data=project_list)


@router.get('/{project_id}/')
def get_project(request, project_id: int):
    """
    通过项目ID查询项目
    """
    try:
        project = Project.objects.get(id=project_id, is_delete=False)
    except Project.DoesNotExist:
        return response(success=False, error=Error.PROJECT_OBJECT_NULL)
    return response(data=model_to_dict(project))


@router.put('/{project_id}/')
def update_project(request, project_id: int, project: ProjectItems):
    """
    通过项目ID更新项目
    """
    try:
        project_obj = Project.objects.get(id=project_id, is_delete=False)
    except Project.DoesNotExist:
        return response(success=False, error=Error.PROJECT_OBJECT_NULL)
    else:
        project_obj.name = project.name
        project_obj.address = project.address
        project_obj.save()
    return response(data=model_to_dict(project_obj))


@router.delete('/{project_id}/')
def delete_project(request, project_id: int):
    """
    通过项目ID删除项目
    """
    try:
        project_obj = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return response(success=False, error=Error.PROJECT_DELETE_ERROR)
    else:
        project_obj.is_delete = True
        project_obj.save()
    return response()


@router.get("/{project_id}/sync")
def update_project_cases(request, project_id: int):
    """
    同步项目用例
    """
    project_obj = get_object_or_404(Project, pk=project_id)
    # 项目本地目录
    test_dir = os.path.join(project_obj.address, "test_dir")
    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True
    # 收集测试用例信息
    main_extend = TestMainExtend(path=test_dir)
    case_info = main_extend.collect_cases()
    print("case info\n", case_info)
    # 删除旧用例
    project_case = Case.objects.filter(project=project_obj)
    project_case.delete()
    # 创建用例
    for case in case_info:
        Case.objects.create(
            project_id=project_id,
            file_name=case["file"],
            class_name=case["class"]["name"],
            class_doc=case["class"]["doc"],
            case_name=case["method"]["name"],
            case_doc=case["method"]["doc"],
        )
    return response()


def _get_file_list(data):
    """
    获取用例文件列表
    """
    files = []
    files_name = []
    for index, d in enumerate(data):
        print("index:", index)
        print("d:", d)
        case_file = {
            "id": index, "label": d["file"], "children": []
        }
        if len(files) == 0:
            files.append(case_file)
            files_name.append(d["file"])
        else:
            if d["file"] not in files_name:
                files.append(case_file)
                files_name.append(d["file"])

    return files


@router.get('/{project_id}/files/')
def get_project_files(request, project_id: int):
    """
    获取项目测试用例文件
    """
    print("项目id", project_id)
    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True
    # 收集测试用例信息
    main_extend = TestMainExtend(path=TEST_DIR)
    case_info = main_extend.collect_cases()
    file_tree = _get_file_list(case_info)
    # 通过接口返回
    return response(data=file_tree)


def _get_case_list(data, file_name):
    """
    获取文件中的用例列表
    """
    case_list = []
    case_name = []
    for d in data:
        case_class_method = d["class"]["name"] + "." + d["method"]["name"]
        if d["file"] == file_name and case_class_method not in case_name:
            case_list.append(d)
            case_name.append(case_class_method)

    return case_list


@router.get('/{project_id}/cases/')
def get_project_cases(request, project_id: int, file_name: str):
    """
    获取项目测试用例
    """
    print("项目id", project_id)
    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True
    # 收集测试用例信息
    main_extend = TestMainExtend(path=TEST_DIR)
    case_info = main_extend.collect_cases()
    cases = _get_case_list(case_info, file_name)
    # 通过接口返回
    return response(data=cases)
