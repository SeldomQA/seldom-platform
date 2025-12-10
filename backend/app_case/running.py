import os
import time
from xml.dom.minidom import parse

from seldom.logging import log

from app_case.models import TestCase, CaseResult
from app_project.models import Env
from app_utils import background
from app_utils.running_utils import configure_test_runner, update_test_case_status
from backend.settings import REPORT_DIR

# Use 10 background threads.
background.n = 10


@background.task
def seldom_running(test_dir: str, case_info: list, report_name: str, case_id: int, env: int):
    """
    seldom运行用例
    :param test_dir: 测试目录
    :param case_info:
    :param report_name:
    :param case_id:
    :param env:
    :return:
    """
    # 配置运行环境
    env = Env.objects.get(id=env)

    # 使用工具函数配置运行器
    main_extend = configure_test_runner(env, test_dir, report_name)
    main_extend.run_cases(case_info)
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
        update_test_case_status(case_id, 2)

        # 删除报告文件
        # os.remove(report_path)

    log.info("running end!!")
