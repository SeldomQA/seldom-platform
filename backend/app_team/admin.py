from django.contrib import admin
from app_team.models import Team


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'is_delete', 'create_time')
    list_filter = ('is_delete',)
    search_fields = ('name', 'email')
    list_per_page = 20
    
    # 编辑字段
    fields = ('name', 'email', 'is_delete')
