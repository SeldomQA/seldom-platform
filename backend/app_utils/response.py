from itertools import chain

from django.http import JsonResponse


class ErrorCode:
    """通用错误码"""
    SUCCESS = (20000, "")
    SYSTEM_ERROR = (50000, "系统错误")
    TOKEN_INVALID = (40001, "Token无效或已过期")
    PERMISSION_DENIED = (40002, "没有操作权限")

    # 参数相关错误 (3000x)
    PARAMS_TYPE_ERROR = (30002, "参数类型错误")
    JSON_TYPE_ERROR = (30003, "JSON格式错误")


class Error:
    """
    自定义错误码与错误信息
    格式: (错误码, 错误信息)
    """
    # 用户相关错误 (100xx)
    USER_OR_PAWD_NULL = (10010, "用户名密码为空")
    USER_OR_PAWD_ERROR = (10011, "用户名密码错误")
    PAWD_ERROR = (10012, "两次密码不一致")
    USER_HAS_REGISTERED = (10013, "用户已注册")
    LOGIN_USSER_ERROR = (10014, "用户名错误")
    LOGIN_PAWD_ERROR = (10015, "密码错误")
    USER_ID_NULL = (40010, "用户id不存在")
    REGISTER_RESTRICT = (40012, "未开放注册, 联系作者获取体验账号")

    # 项目相关错误 (100xx)
    PROJECT_ID_NULL = (10020, "项目id不存在")
    PROJECT_OBJECT_NULL = (10021, "通过id查询项目不存在")
    PROJECT_DELETE_ERROR = (10023, "项目删除失败")
    PROJECT_ADDRESS_ERROR = (10024, "项目地址无法错误")
    PROJECT_CLONE_ERROR = (10025, "项目克隆失败")
    PROJECT_DIR_NULL = (10026, "项目测试目录不存在")
    PROJECT_PULL_ERROR = (10027, "项目拉取失败")

    # 文件相关错误 (100xx)
    FILE_TYPE_ERROR = (10031, "文件类型错误")
    FILE_SIZE_ERROR = (10032, "超出文件大小")
    FILE_NAME_ERROR = (10033, "文件名错误")

    # 团队相关错误 (100xx)
    TEAM_EMAIL_ERROR = (10041, "邮箱格式错误")
    TEAM_EXIST_ERROR = (10042, "创建团队已经存在")

    # 用例相关错误 (200xx)
    CASE_AUDIT_FAIL = (20041, "没有权限审核用例")
    CASE_AUDIT_NULL = (20042, "没有审核通过的用例")
    CASE_DIR_ERROR = (20043, "用例目录不存在")
    CASE_RUNNING_ERROR = (20044, "用例正在执行中")

    # 环境相关错误 (100xx)
    ENV_IS_NULL = (10041, "查询环境为空")
    ENV_IN_USE = (10042, "此环境被任务使用")

    # 任务相关错误 (100xx)
    TASK_ID_NULL = (10051, "任务ID不能为空")
    TASK_RUNNING = (10052, "任务正在运行中")
    TIMED_ADD_FAILED = (10053, "定时任务添加失败")
    TIMED_UPDATE_FAILED = (10054, "定时任务开关失败")
    TIMED_DEL_FAILED = (10055, "定时任务删除失败")
    TIMED_TASK_FAILED = (10056, "定时任务服务报错")


def model_to_dict(instance: object) -> dict:
    """
    对象转字典
    """
    opts = instance._meta
    data = {}
    for f in chain(opts.concrete_fields, opts.private_fields, opts.many_to_many):
        data[f.name] = f.value_from_object(instance)

    for key, value in data.items():
        if key in ["update_time", "create_time"]:
            data[key] = value.strftime('%Y-%m-%d %H:%M:%S')

    return data


def response(success: bool = True, error: tuple = None, result=None):
    """
    自定义接口返回格式
    """
    error_code = ErrorCode.SUCCESS[0]
    error_msg = ErrorCode.SUCCESS[1]
    if error is not None:
        success = False
        error_code = error[0]
        error_msg = error[1]

    resp = {
        "success": success,
        "error": {
            "code": error_code,
            "message": error_msg
        },
    }

    if result is None:
        resp["result"] = {}
    elif isinstance(result, (list, dict)) is False:
        resp["result"] = model_to_dict(result)
    else:
        resp["result"] = result

    return JsonResponse(resp)


def resp_error_dict(error: tuple) -> dict:
    """
    response error data
    :param error: (错误码, 错误信息)
    :return: 错误响应字典
    """
    resp = {
        "success": False,
        "error": {
            "code": error[0],
            "message": error[1]
        },
        "result": {}
    }
    return resp
