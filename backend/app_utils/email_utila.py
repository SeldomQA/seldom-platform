from XTestRunner.config import RunResult


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
