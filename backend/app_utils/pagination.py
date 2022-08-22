"""
author: @虫师
date: 2022-03-20
function: 分页器
"""
from typing import List, Any
from django.db.models import QuerySet
from ninja.pagination import PaginationBase
from ninja import Field, Schema


class CustomPagination(PaginationBase):
    """
    自定义分页器
    """
    class Input(Schema):
        page: int = Field(1, gt=0)
        size: int = 6

    class Output(Schema):
        success: bool = True
        code: dict = {"code": "", "message": ""}
        total: int
        page: int
        size: int
        result: List[Any]

    items_attribute: str = "result"

    def paginate_queryset(self, queryset: QuerySet, pagination: Input, **params):
        page: int = pagination.page
        size: int = pagination.size
        offset = (page - 1) * size
        data = {
            "result": queryset[offset: offset + size],
            "total": len(queryset),
            "page": page,
            "size": size
        }

        return data
