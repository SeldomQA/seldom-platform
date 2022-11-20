from ninja import Schema
from typing import Optional


class TeamIn(Schema):
    """项目入参"""
    name: str
    email: str

