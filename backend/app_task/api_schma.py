from typing import Any, Union
from ninja import Schema
from datetime import datetime, timedelta, date, time


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
    timed: str
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
