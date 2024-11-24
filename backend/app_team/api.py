"""
author:lancao
date:2022-09-12
function:团队管理
"""
from django.shortcuts import get_object_or_404
from ninja import Router

from app_team.api_schma import TeamIn
from app_team.models import Team
from app_utils.response import response, model_to_dict

router = Router(tags=["team"])


@router.post('/create')
def create_team(request, team: TeamIn):
    """
    创建团队
    """
    team_obj = Team.objects.create(
        name=team.name,
        email=team.email
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
        team_list.append(model_to_dict(team))
    return response(result=team_list)


@router.get('/{team_id}/')
def get_team(request, team_id: int):
    """
    通过团队Id查询团队
    """
    team_obj = get_object_or_404(Team, pk=team_id, is_delete=False)
    return response(result=model_to_dict(team_obj))


@router.put('/{team_id}/')
def update_team(request, team_id: int, team: TeamIn):
    """
    通过团队Id更新团队
    """
    team_obj = get_object_or_404(Team, pk=team_id)
    team_obj.name = team.name
    team_obj.email = team.email
    team_obj.save()
    return response(result=model_to_dict(team_obj))


@router.delete('/{team_id}/')
def delete_team(request, team_id: int):
    """
    通过团队Id删除团队
    """
    team_obj = get_object_or_404(Team, pk=team_id)
    team_obj.is_delete = True
    team_obj.save()
    return response()
