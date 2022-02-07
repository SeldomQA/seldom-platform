"""
author: @bugmaster
date: 2022-01-27
function: 项目管理
"""
import os
from ninja import Router
from ninja import Schema, Path
from ninja.pagination import paginate, PaginationBase
from typing import List
from utils.response import response, Error
from seldom import SeldomTestLoader
from seldom import TestMainExtend
from seldom.utils import file



router = Router(tags=["project"])


@router.get('/tree/')
def get_project_tree(request):
    """
    获取测试用例信息
    """
    print(file.dir_dir_dir)
    # 项目用例路径
    test_dir = os.path.join(file.dir_dir_dir, "seldom-web-testing", "test_dir")
    # 开启收集测试用例
    SeldomTestLoader.collectCaseInfo = True
    # 收集测试用例信息
    main_extend = TestMainExtend(path=test_dir)
    case_info = main_extend.collect_cases()
    # 通过接口返回
    return response(data=case_info)
