from functools import wraps
from typing import List, Union

from ninja.errors import HttpError

from app_utils.response import ErrorCode


def check_permissions(permissions: Union[str, List[str]]):
    """
    检查用户权限的装饰器
    :param permissions: 单个权限字符串或权限列表
    """
    if isinstance(permissions, str):
        permissions = [permissions]

    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            # 检查用户是否有任一所需权限
            for permission in permissions:
                if request.user.has_perm(permission):
                    return func(request, *args, **kwargs)

            # 如果没有任何所需权限，返回权限错误
            raise HttpError(
                200,
                ErrorCode.PERMISSION_DENIED
            )

        return wrapper

    return decorator


# 项目权限
PROJECT_PERMISSIONS = {
    "CREATE": "project.add_project",
    "CHANGE": "project.change_project",
    "DELETE": "project.delete_project",
    "VIEW": "project.view_project",
}

# 环境权限
ENV_PERMISSIONS = {
    "CREATE": "project.add_env",
    "CHANGE": "project.change_env",
    "DELETE": "project.delete_env",
    "VIEW": "project.view_env",
}
