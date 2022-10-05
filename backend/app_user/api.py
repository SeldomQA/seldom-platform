from ninja import Router
from app_utils.response import response, Error
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.sessions.models import Session
from app_user.api_schema import RegisterIn, LoginIn, LogoutIn
from app_utils.token import TokenMethod

router = Router(tags=["user"])


@router.post("/register")
def register(request, params: RegisterIn):
    """
    用户注册
    auth=None 该接口不需要认证
    """
    username = params.username
    password = params.password
    password2 = params.password2

    if password != password2:
        return response(error=Error.PAWD_ERROR)

    try:
        User.objects.get_by_natural_key(username)
    except User.DoesNotExist:
        pass
    else:
        return response(error=Error.USER_HAS_REGISTERED)

    user = User.objects.create_user(username=username, password=password)
    user_info = {
        "id": user.id,
        "username": user.username
    }
    return response(result=user_info)


@router.post("/login", auth=None)
def login(request, params: LoginIn):
    """
    用户登录
    auth=None 该接口不需要认证
    """
    username = params.username
    password = params.password
    if username == "" or password == "":
        return response(error=Error.USER_OR_PAWD_NULL)
    else:
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            token_method = TokenMethod()
            token = token_method.create_token(user.username)
            user_info = {
                "id": user.id,
                "username": user.username,
                "token": token
            }
            return response(result=user_info)
        else:
            return response(error=Error.USER_OR_PAWD_ERROR)


@router.post("/logout", auth=None)
def logout(request, params: LogoutIn):
    """
    退出登录
    auth=None 该接口不需要认证R
    """
    print(params.token)
    token_method = TokenMethod()
    token_method.delete_token(params.token)

    return response(success=True)
