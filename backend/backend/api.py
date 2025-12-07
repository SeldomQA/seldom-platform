"""
author: @bugmaster
data: 2020-06-11
function: api接口
"""
from django.contrib.auth.models import User
from ninja import NinjaAPI
from ninja.errors import HttpError
from ninja.security import HttpBearer

from app_case.api import router as case_router
from app_project.api.project_api import router as project_router
from app_project.api.env_api import router as env_router
from app_project.api.team_api import router as team_router
from app_task.api import router as task_router
from app_user.api import router as user_router
from app_utils.response import ErrorCode
from app_utils.response import resp_error_dict
from app_utils.token import CustomToken


class InvalidToken(Exception):
    """无效token"""
    pass


class GlobalAuth(HttpBearer):

    def authenticate(self, request, token):
        """
        验证token
        :param request: 请求对象
        :param token: token字符串
        :return: token/None
        """
        token_method = CustomToken()
        is_token = token_method.check_token(token)
        if is_token is False:
            raise InvalidToken

        # 从token中获取用户信息并添加到request中
        try:
            user_info = token_method.get_token_info(token)
            user_id = user_info.get("user_id")
            user = User.objects.get(id=user_id)
            request.user = user
            return token
        except Exception:
            raise InvalidToken


# 启用全局认证
api = NinjaAPI(auth=GlobalAuth())


# 自定义异常处理
@api.exception_handler(InvalidToken)
def on_invalid_token(request, exc):
    """无效token返回类型 """
    return api.create_response(
        request,
        resp_error_dict(ErrorCode.TOKEN_INVALID),
        status=401
    )


@api.exception_handler(HttpError)
def on_http_error(request, exc):
    """处理HTTP错误"""
    error = ErrorCode.SYSTEM_ERROR
    try:
        http_status = exc.args[0]
        if http_status == 200:
            error = exc.args[1]
    except BaseException:
        pass

    return api.create_response(
        request,
        resp_error_dict(error),
        status=200
    )


@api.get('/ping', auth=None)
def api_check(request):
    """
    健康检查接口 - 不需要认证
    """
    return {"result": "ok"}


api.add_router("/project/", project_router)
api.add_router("/project/", env_router)
api.add_router("/project/", team_router)
api.add_router("/case/", case_router)
api.add_router("/task/", task_router)
api.add_router("/user/", user_router)
