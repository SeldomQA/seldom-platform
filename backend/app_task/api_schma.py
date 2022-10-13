from typing import Any,Union
from ninja import Schema
from datetime import datetime, timedelta, date, time


class TaskIn(Schema):
    """任务入参"""
    project: str
    name: str
    env_id: int
    team_id: int
    cases: list


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
