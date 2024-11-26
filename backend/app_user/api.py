from django.contrib.auth.models import User, Permission
from django.contrib.contenttypes.models import ContentType
from ninja import Router

from app_user.api_schema import RegisterIn, LoginIn, LogoutIn
from app_utils.response import response, Error
from app_utils.token import CustomToken

router = Router(tags=["user"])


@router.post("/register", auth=None)
def register(request, params: RegisterIn):
    """
    用户注册
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

    # 创建用户
    user = User.objects.create_user(username=username, password=password)

    # 为新用户添加基本权限
    content_type = ContentType.objects.get_for_model(User)
    basic_permissions = Permission.objects.filter(content_type=content_type)
    for perm in basic_permissions:
        user.user_permissions.add(perm)

    user_info = {
        "id": user.id,
        "username": user.username,
        "permissions": [perm.codename for perm in user.user_permissions.all()]
    }
    return response(result=user_info)


@router.post("/login", auth=None)
def login(request, data: LoginIn):
    """
    用户登录
    """
    try:
        user = User.objects.get(username=data.username)
        if user.check_password(data.password):
            # 生成token
            token_method = CustomToken()
            token = token_method.create_token(user.id, user.username)

            return response(result={
                "token": token,
                "user_id": user.id,
                "username": user.username,
                "permissions": [perm.codename for perm in user.user_permissions.all()]
            })
        else:
            return response(error=Error.LOGIN_ERROR)
    except User.DoesNotExist:
        return response(error=Error.LOGIN_ERROR)


@router.post("/logout", auth=None)
def logout(request, params: LogoutIn):
    """
    退出登录
    auth=None 该接口不需要认证
    """
    token_method = CustomToken()
    token_method.invalidate_token(params.token)
    return response()
