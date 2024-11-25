import re

from XTestRunner.config import RunResult


def validate_email(email: str) -> bool:
    """
    验证邮箱格式是否正确。

    :param email: 待验证的邮箱地址
    :return: 如果邮箱格式正确，返回 True；否则返回 False
    """
    # 定义正则表达式
    email_regex = r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'

    # 使用正则表达式匹配邮箱
    if not re.match(email_regex, email):
        return False

    return True


def send_email_config(passed, errors, failures, skipped, tests):
    """
    XTestRunner Test Result
    """
    RunResult.passed = passed
    RunResult.errors = errors
    RunResult.failed = failures
    RunResult.skipped = skipped
    RunResult.count = tests
    p_percent = '0.00'
    e_percent = '0.00'
    f_percent = '0.00'
    s_percent = '0.00'
    if tests > 0:
        p_percent = '{:.2%}'.format(RunResult.passed / tests)
        e_percent = '{:.2%}'.format(RunResult.errors / tests)
        f_percent = '{:.2%}'.format(RunResult.failed / tests)
        s_percent = '{:.2%}'.format(RunResult.skipped / tests)

    RunResult.count = tests
    RunResult.pass_rate = p_percent
    RunResult.error_rate = e_percent
    RunResult.failure_rate = f_percent
    RunResult.skip_rate = s_percent
