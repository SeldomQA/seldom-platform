"""
author:lancao
date:2022-09-12
function:团队管理
"""
import os
import hashlib
import subprocess
from django.shortcuts import get_object_or_404
from ninja import File
from ninja import Router
from ninja.files import UploadedFile
from seldom import SeldomTestLoader
from seldom import TestMainExtend
from seldom.utils import file
from backend.settings import BASE_DIR
from random import randint
from app_team.models import Team
from app_team.api_schma import TeamIn
from app_utils.response import response,Error,model_to_dict

router = Router(tags=["team"])

@router.post('/create')
def create_team(request,team:TeamIn):
    team_obj = Team.objects.create( 
        name=team.name
    )
    return response(result=model_to_dict(team_obj))


@router.get('/list')
def get_teams(request):
    """
    获取团队列表
    """
    teams = Team.objects.filter(is_delete=False)
    team_list = []
    for team in teams:
        #团队名
        team_list.append(model_to_dict(team))
    return response(result=team_list)
    print(team_list)

@router.get('/{team_id}/')
def get_team(request,team_id:int):
    """
    通过团队Id查询团队
    """
    team_obj = get_object_or_404(Team,pk=team_id,is_delete=False)
    return response(result=model_to_dict(team_obj))

@router.put('/{team_id}/')
def get_team(request,team_id:int,team:TeamIn):
    """
    通过团队Id更新团队
    """
    team_obj = get_object_or_404(Team,pk=team_id)
    team_obj.name = team.name
    team_obj.save()
    return response(result=model_to_dict(team_obj))

@router.delete('/{team_id}/')
def delete_team(request,team_id:int):
    """
    通过团队Id删除团队
    """
    team_obj = get_object_or_404(Team,pk=team_id)
    team_obj.is_delete = True
    team_obj.save()
    return response()
