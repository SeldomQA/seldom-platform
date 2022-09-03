"""
author: @bugmaster
data: 2020-06-11
function: api接口
"""
from ninja import NinjaAPI
from app_project.api import router as project_router
from app_case.api import router as case_router
from app_task.api import router as task_router
from app_user.api import router as user_router
from ninja.security import HttpBearer
from app_utils.token import TokenMethod


class InvalidToken(Exception):
    """无效token"""
    pass


class GlobalAuth(HttpBearer):
    def authenticate(self, request,token):
        bool = TokenMethod.check_token(token)
        if bool == False:
            raise InvalidToken
        else:
            return token


# api = NinjaAPI(auth=GlobalAuth())
api = NinjaAPI()


# 自定义异常，改变出现错误时返回值
@api.exception_handler(InvalidToken)
def on_invalid_token(request, exc):
    """无效token返回类型 """
    return api.create_response(request, {"detail": "Invalid token supplied"}, status=401)


api.add_router("/project/", project_router)
api.add_router("/case/", case_router)
api.add_router("/task/", task_router)
api.add_router("/user/", user_router)
