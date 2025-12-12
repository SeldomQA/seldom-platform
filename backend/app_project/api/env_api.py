"""
author: @bugmaster
date: 2024-04-08
function: 环境管理
"""
from ninja import Router

from app_project.models import Env
from app_project.schema import EnvIn
from app_task.models import TestTask
from app_utils.permission import check_permissions, ENV_PERMISSIONS
from app_utils.response import response, Error, model_to_dict

router = Router(tags=["env"])


@router.post('/env')
@check_permissions(ENV_PERMISSIONS["CREATE"])
def create_env(request, env: EnvIn):
    """
    创建环境
    """
    env_obj = Env.objects.create(
        name=env.name,
        test_type=env.test_type,
        env=env.env,
        rerun=env.rerun,
        is_clear_cache=env.is_clear_cache,
        browser=env.browser,
        base_url=env.base_url,
        remote=env.remote,
        app_server=env.app_server,
        app_info=env.app_info
    )
    return response(result=model_to_dict(env_obj))


@router.get('/env/{env_id}/')
def get_env(request, env_id: int):
    """
    获取环境
    """
    try:
        env = Env.objects.get(id=env_id, is_delete=False)
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response(result=model_to_dict(env))


@router.get('/env/list')
def get_env_list(request):
    """
    获取环境列表
    """
    envs = Env.objects.filter(is_delete=False)
    env_list = []
    for env in envs:
        env_list.append(model_to_dict(env))
    return response(result=env_list)


@router.delete('/env/{env_id}/')
@check_permissions(ENV_PERMISSIONS["DELETE"])
def delete_env(request, env_id: int):
    """
    删除环境
    """
    task = TestTask.objects.filter(env_id=env_id, is_delete=False)
    if len(task) > 0:
        return response(error=Error.ENV_IN_USE)

    try:
        env = Env.objects.get(id=env_id)
        env.is_delete = True
        env.save()
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response()


@router.put('/env/{env_id}/')
@check_permissions(ENV_PERMISSIONS["CHANGE"])
def update_env(request, env_id: int, env: EnvIn):
    """
    更新环境
    """
    try:
        env_obj = Env.objects.get(id=env_id)
        env_obj.name = env.name
        env_obj.test_type = env.test_type
        env_obj.env = env.env
        env_obj.rerun = env.rerun
        env_obj.is_clear_cache = env.is_clear_cache
        env_obj.browser = env.browser
        env_obj.base_url = env.base_url
        env_obj.remote = env.remote
        env_obj.app_server = env.app_server
        env_obj.app_info = env.app_info
        env_obj.save()
    except Env.DoesNotExist:
        return response(error=Error.ENV_IS_NULL)

    return response()
