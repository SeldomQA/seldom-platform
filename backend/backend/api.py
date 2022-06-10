"""
author: @bugmaster
data: 2020-06-11
function: api接口
"""
from ninja import NinjaAPI
from app_project.api import router as project_router

api = NinjaAPI()

api.add_router("/project/", project_router)
