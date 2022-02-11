"""
author: @bugmaster
date: 2022-02-07
function: 项目管理
"""
import os
from ninja import Router
from utils.response import response, Error
from seldom import SeldomTestLoader
from seldom import TestMainExtend
from seldom.utils import file

# seldom自动化项目用例路径（seldom-web-testing）
TEST_DIR = os.path.join(file.dir_dir_dir, "seldom-web-testing", "test_dir")

router = Router(tags=["project"])


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


@router.get('/files/')
def get_project_files(request):
    """
    获取项目测试用例文件
    """
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


@router.get('/cases/')
def get_project_cases(request, file_name: str):
    """
    获取项目测试用例
    """
    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True
    # 收集测试用例信息
    main_extend = TestMainExtend(path=TEST_DIR)
    case_info = main_extend.collect_cases()
    cases = _get_case_list(case_info, file_name)
    # 通过接口返回
    return response(data=cases)
