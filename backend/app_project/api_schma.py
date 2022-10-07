from ninja import Schema
from typing import Optional


class ProjectIn(Schema):
    """项目入参"""
    name: str
    address: str
    case_dir: str
    cover_name: str = None
    path_name: str = None


class EnvIn(Schema):
    """环境入参"""
    name: str
    env: Optional[str] = None
    browser: Optional[str] = None
    base_url: Optional[str] = None


class MergeCase(Schema):
    """合并用例"""
    add_case: list
    del_case: list
