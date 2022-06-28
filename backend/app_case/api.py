import os
import time
import threading
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from ninja import Router
from app_project.models import Project
from app_case.models import TestCase
from seldom import TestMainExtend
from seldom.logging import log
from xml.dom.minidom import parse
from utils.response import response
from backend.settings import BASE_DIR

# test report dir
REPORT_DIR = os.path.join(BASE_DIR, "reports")

router = Router(tags=["case"])


def seldom_running(test_dir, case_info, report_name, case_id):
    """
    seldom运行用例
    """

    main_extend = TestMainExtend(path=test_dir, report=report_name)
    main_extend.run_cases(case_info)
    time.sleep(1)

    # 打开xml文档
    dom = parse(os.path.join(REPORT_DIR, report_name))
    # 得到文档元素对象
    root = dom.documentElement
    # 获取(一组)标签
    testsuite = root.getElementsByTagName('testsuite')
    errors = testsuite[0].getAttribute("errors")
    failures = testsuite[0].getAttribute("failures")
    skipped = testsuite[0].getAttribute("skipped")
    run_time = testsuite[0].getAttribute("time")

    system_out = root.getElementsByTagName('system-out')
    error = root.getElementsByTagName('error')
    if len(system_out) > 0:
        system_out_data = system_out[0].firstChild.data
    else:
        system_out_data = ""
    if len(error) > 0:
        error_data = error[0].firstChild.data
    else:
        error_data = ""

    if errors == 1:
        result = "error"
    elif failures == 1:
        result = "failure"
    elif skipped == 1:
        result = "skipped"
    else:
        result = "passed"

    test_case = TestCase.objects.get(id=case_id)
    test_case.status = 2
    test_case.result = result
    test_case.run_time = run_time
    test_case.system_out = system_out_data
    test_case.error = error_data
    test_case.report = report_name
    test_case.save()
    log.info("save report")


def run(test_dir, case_info, report_name, case_id):
    threads = []
    t = threading.Thread(target=seldom_running, args=(test_dir, case_info, report_name, case_id,))
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
    case.status = 1
    case.save()

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
    report_name = f'{str(time.time()).split(".")[0]}.xml'
    # 丢给线程执行用例
    threads = []
    t = threading.Thread(target=run, args=(test_dir, case_info, report_name, case.id))
    threads.append(t)
    for t in threads:
        t.start()

    return response()
