import os
import time
import threading
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from ninja import Router
from app_project.models import Project
from app_case.models import TestCase
from seldom import TestMainExtend
from utils.response import response


router = Router(tags=["case"])


def seldom_running(test_dir, case_info, report_name):
    """
    seldom运行用例
    """

    main_extend = TestMainExtend(path=test_dir, report=report_name)
    main_extend.run_cases(case_info)


def run(test_dir, case_info, report_name):
    threads = []
    t = threading.Thread(target=seldom_running, args=(test_dir, case_info, report_name,))
    threads.append(t)
    for t in threads:
        t.start()
    for t in threads:
        t.join()


@router.post('/{case_id}/running')
def running_case(request, case_id: int):
    """
    运行测试用例
    """
    case = get_object_or_404(TestCase, pk=case_id)
    case_info = [{
        "file": case.file_name,
        "class": {
            "name": case.class_name,
            "doc": case.class_doc
        },
        "method": {
            "name": case.case_name,
            "doc": case.case_doc
        }
    }]
    project = Project.objects.get(id=case.project_id)
    test_dir = os.path.join(project.address, "test_dir")
    report_name = f'{str(time.time()).split(".")[0]}.html'
    # 丢给线程执行用例
    threads = []
    t = threading.Thread(target=run, args=(test_dir, case_info, report_name))
    threads.append(t)
    for t in threads:
        t.start()

    # 更新报告名称
    case.report = report_name
    case.save()

    return response()
