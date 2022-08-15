from ninja import Schema


class RegisterIn(Schema):
    """
    注册入参
    """
    username: str
    password: str
    password2: str


class LoginIn(Schema):
    """
    登录入参
    """
    username: str
    password: str
