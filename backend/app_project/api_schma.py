from typing import Optional

from ninja import Schema


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
    test_type: str
    env: Optional[str] = None
    rerun: int = None
    browser: Optional[str] = None
    base_url: Optional[str] = None
    remote: Optional[str] = None
    app_server: Optional[str] = None
    app_info: Optional[str] = "{}"


class MergeCase(Schema):
    """合并用例"""
    add_case: list
    del_case: list
