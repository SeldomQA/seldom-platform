import os
import time
import threading
from xml.dom.minidom import parse
from seldom.utils import file
from seldom.logging import log
from seldom import TestMainExtend
from seldom import Seldom
from seldom import ChromeConfig, FirefoxConfig, EdgeConfig
from app_project.models import Project, Env
from app_task.models import TestTask, TaskReport, ReportDetails
from backend.settings import BASE_DIR, REPORT_DIR
from app_utils import background


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
        ChromeConfig.headless = True
        FirefoxConfig.headless = True
        EdgeConfig.headless = True

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
    project_dir = file.join(BASE_DIR, "github", project.address.split("/")[-1])
    file.add_to_path(project_dir)

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

    # 如果有失败或错误用例发送邮箱
    if int(errors) > 0 or int(failures) > 0:
        # 未实现
        log.info("Send a warning message")


# def thread_run_task(test_dir, case_info, report_name, task_id):
#     """
#     线程运行任务
#     :param test_dir: 测试用例目录
#     :param case_info: 测试用例信息
#     :param report_name: 测试报告
#     :param task_id: 任务ID
#     :return:
#     """
#     threads = []
#     t = threading.Thread(target=seldom_running, args=(test_dir, case_info, report_name, task_id))
#     threads.append(t)
#     for t in threads:
#         t.start()
#     for t in threads:
#         t.join()
