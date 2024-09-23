import os
import time
from xml.dom.minidom import parse

from seldom import Seldom
from seldom import TestMainExtend
from seldom.logging import log
from selenium.webdriver import ChromeOptions
from selenium.webdriver import EdgeOptions
from selenium.webdriver import FirefoxOptions

from app_case.models import TestCase, CaseResult
from app_project.models import Env
from app_utils import background
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

    Seldom.env = env.env
    browser_conf = None
    if env.browser != "":
        browser_type = env.browser
        browser_conf = {}
        if env.remote != "" and env.remote is not None:
            browser_conf["command_executor"] = env.remote
        # 设置浏览器headless模式
        if browser_type in ["gc", "chrome"]:
            chrome_options = ChromeOptions()
            chrome_options.add_argument("--headless=new")
            browser_conf["browser"] = "chrome"
            browser_conf["options"] = chrome_options
        elif browser_type in ["ff", "firefox"]:
            firefox_options = FirefoxOptions()
            firefox_options.add_argument("-headless")
            browser_conf["browser"] = "firefox"
            browser_conf["options"] = firefox_options
        elif browser_type in ["edge"]:
            edge_options = EdgeOptions()
            edge_options.add_argument("--headless=new")
            browser_conf["browser"] = "edge"
            browser_conf["options"] = edge_options

    if env.base_url != "":
        base_url = env.base_url
    else:
        base_url = None

    # 1. 直接执行
    main_extend = TestMainExtend(path=test_dir, report=report_name, rerun=env.rerun)
    if env.test_type == "http":
        main_extend = TestMainExtend(path=test_dir, report=report_name, base_url=base_url, rerun=env.rerun)
    elif env.test_type == "web":
        main_extend = TestMainExtend(path=test_dir, report=report_name, browser=browser_conf, rerun=env.rerun)
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
        test_case = TestCase.objects.get(id=case_id)
        test_case.status = 2
        test_case.save()

        # 删除报告文件
        # os.remove(report_path)

    log.info("running end!!")
