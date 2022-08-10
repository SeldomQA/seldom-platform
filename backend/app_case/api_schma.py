from typing import Any
from ninja import Schema
from enum import Enum
from typing import Optional


class EnvType(str, Enum):
    """环境类型"""
    product = "product"
    preannouncement = "preannouncement"


class RunCaseIn(Schema):
    """运行测试用例入参"""
    base_url: Optional[str] = None
    browser: Optional[str] = None
    env: Optional[str] = None
