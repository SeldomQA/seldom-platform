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
from ninja import Schema
from app_project.models import Project
from app_case.models import TestCase


router = Router(tags=["project"])


class ProjectItems(Schema):
    name: str
    address: str


@router.post('/create')
def create_project(request, project: ProjectItems):
    """
    创建项目
    """
    project_obj = Project.objects.create(
        name=project.name, address=project.address)
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
    project_obj = get_object_or_404(Project, pk=project_id, is_delete=False)
    return response(data=model_to_dict(project_obj))


@router.put('/{project_id}/')
def update_project(request, project_id: int, project: ProjectItems):
    """
    通过项目ID更新项目
    """
    project_obj = get_object_or_404(Project, pk=project_id)
    project_obj.name = project.name
    project_obj.address = project.address
    project_obj.save()
    return response(data=model_to_dict(project_obj))


@router.delete('/{project_id}/')
def delete_project(request, project_id: int):
    """
    通过项目ID删除项目
    """
    project_obj = get_object_or_404(Project, pk=project_id)
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
    project_case = TestCase.objects.filter(project=project_obj)
    project_case.delete()
    # 创建用例
    for case in case_info:
        TestCase.objects.create(
            project_id=project_id,
            file_name=case["file"],
            class_name=case["class"]["name"],
            class_doc=case["class"]["doc"],
            case_name=case["method"]["name"],
            case_doc=case["method"]["doc"],
        )
    return response()


@router.get("/{project_id}/files")
def get_project_files(request, project_id: int):
    """
    获取项目用例文件列表
    """
    cases = TestCase.objects.filter(project_id=project_id)

    files = []
    files_name = []
    for case in cases:
        if "." in case.file_name:
            case_path = case.file_name.split('.')
        else:
            case_path = [case.file_name + ".py"]

        print(case_path)
        # f_name = case.file_name.replace(".", " / ")

        if case_path[0] not in files_name:
            files_name.append(case_path[0])
            if ".py" in case_path[0]:
                case_level_one = {
                    "label": case_path[0],
                    "full_name": case_path[0],
                    "icon": "el-icon-tickets",
                    "children": []
                }
            else:
                case_level_one = {
                    "label": case_path[0],
                    "full_name": case_path[0],
                    "icon": "el-icon-folder",
                    "children": []
                }

            files.append(case_level_one)

    return response(data=files)


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
        # 通过接口返回
        return response(data=case_list)
    else:
        return response(data=[])


@router.get('/{project_id}/subdirectory')
def get_project_subdirectory(request, project_id: int, file_name: str):
    """
    获取子目录
    """
    all_cases = TestCase.objects.filter(project_id=project_id)
    files_name = []
    for case in all_cases:
        print("all", case.file_name, case.file_name.startswith(file_name + "."))
        if case.file_name.startswith(file_name + ".") is True:
            print(len(file_name + "."))
            if case.file_name[len(file_name + "."):] not in files_name:
                files_name.append(case.file_name[len(file_name + "."):])

    case_name = []
    for f_name in files_name:
        if "." in f_name:
            case_path = f_name.split('.')
            case_level_two = {
                "label": case_path[0],
                "full_name": file_name + "." + case_path[0],
                "icon": "el-icon-folder",
                "children": []
            }
        else:
            case_path = [f_name + ".py"]
            case_level_two = {
                "label": case_path[0],
                "full_name": file_name + "." + case_path[0],
                "icon": "el-icon-tickets",
                "children": []
            }
        case_name.append(case_level_two)

    return response(data=case_name)
