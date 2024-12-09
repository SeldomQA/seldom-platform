from datetime import datetime
from typing import Union

from ninja import Schema


class TaskIn(Schema):
    """任务入参"""
    project: str
    name: str
    env_id: int
    team_id: int
    cases: list


class TaskOut(Schema):
    id: int
    name: str
    status: int
    env_id: int
    env: str
    team_id: int
    team: str
    timed_status: str
    timed_conf: dict
    email: str = None
    execute_count: int
    create_time: Union[datetime]
    update_time: Union[datetime]
    project_id: int


class ReportIn(Schema):
    """报告查询入参"""
    type: str = None


class ReportOut(Schema):
    """任务报告出参"""
    id: int
    name: str
    passed: int
    error: int
    failure: int
    skipped: int
    tests: int
    run_time: str
    create_time: Union[datetime]


class TimedIn(Schema):
    """Crontab 定时任务入参"""
    task_id: int
    second: str = "0"  # 0 - 59s
    minute: str = "*"  # 0 - 59m
    hour: str = "*"  # 0-23h
    day: str = "*"  # 1 - 31
    month: str = "*"  # 1~12
    day_of_week: str = "*"  # 一周中的第几天(0 - 6) or (mon、tue、wed、thu、fri、fri、sat、sun)
