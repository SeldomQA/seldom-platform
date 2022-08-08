import os
import time
import threading
from xml.dom.minidom import parse
from seldom.logging import log
from seldom import Seldom
from seldom import TestMainExtend
from app_case.models import TestCase, CaseResult
from backend.settings import REPORT_DIR


def seldom_running(test_dir, case_info, report_name, case_id, env):
    """
    seldom运行用例
    :param test_dir: 测试目录
    :param case_info:
    :param report_name:
    :param case_id:
    :param env:
    :return:
    """
    # 环境判断
    if env == "preannouncement":
        Seldom.env = "preannouncement"
        base_url = "http://123.io/"
    elif env == "product":
        Seldom.env = "product"
        base_url = "http://123.io"
    else:
        Seldom.env = "product"
        base_url = "https://123.com"

    # 1. 直接执行
    main_extend = TestMainExtend(path=test_dir, report=report_name, base_url=base_url)
    main_extend.run_cases(case_info)

    # 2. 借助项目中的文件执行
    # from cases_collect import run_cases
    # run_cases(case_info, report_name)
    time.sleep(1)

    # 打开xml文档
    report_path = os.path.join(REPORT_DIR, report_name)
    dom = parse(report_path)
    # 得到文档元素对象
    root = dom.documentElement
    # 获取(一组)标签
    testsuite = root.getElementsByTagName('testsuite')
    name = testsuite[0].getAttribute("name")
    run_time = testsuite[0].getAttribute("time")
    errors = testsuite[0].getAttribute("errors")
    failures = testsuite[0].getAttribute("failures")
    skipped = testsuite[0].getAttribute("skipped")
    tests = testsuite[0].getAttribute("tests")
    passed = int(tests) - int(errors) - int(failures) - int(skipped)

    testcase = root.getElementsByTagName('testcase')
    system_out = ""
    for case in testcase:
        system_out = system_out + "Case Name: " + case.getAttribute("name") + "\n"
        try:
            system_out = system_out + case.childNodes[1].firstChild.data + "\n"
        except (AttributeError, IndexError) as e:
            pass

        try:
            system_out = system_out + case.childNodes[3].firstChild.data + "\n"
        except (AttributeError, IndexError) as e:
            pass

        try:
            system_out = system_out + case.childNodes[5].firstChild.data
        except (AttributeError, IndexError) as e:
            pass

    with open(report_path, "r", encoding="utf-8") as f:
        report_text = f.read()
        # 保存表
        CaseResult.objects.create(
            case_id=case_id,
            name=name,
            report=report_text,
            passed=passed,
            error=errors,
            failure=failures,
            skipped=skipped,
            tests=tests,
            system_out=system_out,
            run_time=run_time,
        )
        # 修改状态
        test_case = TestCase.objects.get(id=case_id)
        test_case.status = 2
        test_case.save()

    # 删除报告文件
    # os.remove(report_path)
    log.info("running end!!")


def thread_run_case(test_dir, case_info, report_name, case_id, env):
    """
    线程运行用例
    """
    threads = []
    t = threading.Thread(target=seldom_running, args=(test_dir, case_info, report_name, case_id, env, ))
    threads.append(t)
    for t in threads:
        t.start()
    for t in threads:
        t.join()
