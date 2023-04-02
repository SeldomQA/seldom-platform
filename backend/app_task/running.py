import time
from xml.dom.minidom import parse

from selenium.webdriver import ChromeOptions
from selenium.webdriver import EdgeOptions
from selenium.webdriver import FirefoxOptions
from seldom import (
    SMTP,
    Seldom,
    TestMainExtend
)
from seldom.utils import file
from seldom.logging import log

from app_project.models import Project, Env
from app_team.models import Team
from app_task.models import TestTask, TaskReport, ReportDetails
from backend.settings import REPORT_DIR
from backend.config import EmailConfig
from app_utils import background
from app_utils.project_utils import project_dir
from app_utils.email_utila import send_email_config


# Use 10 background threads.
background.n = 10


@background.task
def seldom_running(test_dir, case_info, report_name, task_id):
    """
    seldom运行用例
    :param test_dir: 测试用例目录
    :param case_info: 测试用例信息
    :param report_name: 测试报告名称
    :param task_id: 任务id
    :return:
    """
    task = TestTask.objects.get(id=task_id)
    task.status = 1
    task.save()

    # 环境判断
    env = Env.objects.get(id=task.env_id)
    if env.browser == "":
        browser = None
    else:
        browser = env.browser
        # 设置浏览器headless模式
        if browser in ["gc", "chrome"]:
            chrome_options = ChromeOptions()
            chrome_options.headless = True
            browser = {
                "browser": "chrome",
                "option": chrome_options
            }
        elif browser in ["ff", "firefox"]:
            firefox_options = FirefoxOptions()
            firefox_options.add_argument("-headless")
            browser = {
                "browser": "firefox",
                "option": firefox_options
            }
        elif browser in ["edge"]:
            edge_options = EdgeOptions()
            edge_options.add_argument("headless")
            browser = {
                "browser": "edge",
                "option": edge_options
            }
        else:
            chrome_options = ChromeOptions()
            chrome_options.headless = True
            browser = {
                "browser": "chrome",
                "option": chrome_options
            }

    if env.env == "":
        Seldom.env = None
    else:
        Seldom.env = env.env
    if env.base_url == "":
        base_url = None
    else:
        base_url = env.base_url

    # 项目添加环境变量
    project = Project.objects.get(id=task.project_id)
    project_address_temp = project_dir(project.address, temp=True)
    file.add_to_path(project_address_temp)

    # 1. 直接执行
    main_extend = TestMainExtend(path=test_dir, browser=browser, report=report_name, base_url=base_url)
    main_extend.run_cases(case_info)
    time.sleep(2)

    report_path = file.join(REPORT_DIR, report_name)
    dom = parse(report_path)
    root = dom.documentElement
    # 获取(一组)标签
    testsuite = root.getElementsByTagName('testsuite')

    errors = 0
    failures = 0
    skipped = 0
    tests = 0
    run_time = float(0)
    for suite in testsuite:
        errors = errors + int(suite.getAttribute("errors"))
        failures = failures + int(suite.getAttribute("failures"))
        skipped = skipped + int(suite.getAttribute("skipped"))
        tests = tests + int(suite.getAttribute("tests"))
        run_time = run_time + float(suite.getAttribute("time"))

    name = report_name
    passed = int(tests) - int(errors) - int(failures) - int(skipped)

    with open(report_path, "r", encoding="utf-8") as f:
        report_text = f.read()
        # 保存表
        result = TaskReport.objects.create(
            task_id=task_id,
            name=name,
            report=report_text,
            passed=passed,
            error=errors,
            failure=failures,
            skipped=skipped,
            tests=tests,
            run_time=str(run_time),
        )

        testcase = root.getElementsByTagName('testcase')
        for case in testcase:
            class_name = case.getAttribute("classname")
            name = case.getAttribute("name")
            run_time = case.getAttribute("time")

            nodes = case.childNodes
            doc = ""
            system_out = ""
            system_error = ""
            failure_out = ""
            error_out = ""
            skipped_message = ""
            for node in nodes:
                if node.nodeName == "doc":
                    doc = node.firstChild.data
                if node.nodeName == "system-out":
                    system_out = node.firstChild.data
                if node.nodeName == "system-err":
                    system_error = node.firstChild.data
                if node.nodeName == "failure":
                    failure_out = node.firstChild.data
                if node.nodeName == "error":
                    error_out = node.firstChild.data
                if node.nodeName == "skipped":
                    skipped_message = node.getAttribute("message")

            ReportDetails.objects.create(
                result_id=result.id,
                class_name=class_name,
                name=name,
                run_time=str(run_time),
                doc=doc,
                system_out=system_out,
                system_err=system_error,
                failure_out=failure_out,
                error_out=error_out,
                skipped_message=skipped_message,
            )
        # 修改状态（2-已运行）
        test_case = TestTask.objects.get(id=task_id)
        test_case.status = 2
        test_case.execute_count = test_case.execute_count + 1
        test_case.save()

        # 删除报告文件
        # os.remove(report_path)

    log.info("running end!!")

    # 测试报告发送邮件
    send_email_config(passed, errors, failures, skipped, tests)
    team = Team.objects.get(id=task.team_id)
    if ";" in team.email:
        to_email = team.email.split(";")
    else:
        to_email = team.email

    smtp = SMTP(user=EmailConfig.user, password=EmailConfig.password, host=EmailConfig.host)
    smtp.sendmail(to=to_email, subject="seldom-platform", delete=False)
    log.info("Send a warning message")
