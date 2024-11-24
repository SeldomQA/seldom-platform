from seldom import Seldom, TestMainExtend
from seldom.utils import cache
from selenium.webdriver import ChromeOptions, FirefoxOptions, EdgeOptions

from app_project.models import Env


def configure_browser(env: Env):
    """
    配置浏览器设置
    :param env: Env 对象
    :return: browser_conf 配置字典
    """
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
    return browser_conf


def configure_test_runner(env: Env, test_dir: str, report_name: str):
    """
    配置测试运行器
    :param env: Env 对象
    :param test_dir: 测试目录
    :param report_name: 报告名称
    :return: TestMainExtend 实例
    """
    Seldom.env = env.env if env.env != "" else None
    base_url = env.base_url if env.base_url != "" else None
    browser_conf = configure_browser(env)

    # running pre -   is clear all cache
    if env.is_clear_cache:
        cache.clear()
    main_extend = TestMainExtend(path=test_dir, report=report_name, rerun=env.rerun)
    if env.test_type == "http":
        main_extend = TestMainExtend(path=test_dir, report=report_name, base_url=base_url, rerun=env.rerun)
    elif env.test_type == "web":
        main_extend = TestMainExtend(path=test_dir, report=report_name, browser=browser_conf, rerun=env.rerun)

    return main_extend
