from django.contrib import admin
from app_task.models import TestTask, TaskReport, ReportDetails
from app_project.models import Env
from app_team.models import Team


@admin.register(TestTask)
class TestTaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'project', 'get_env_name', 'get_team_name', 'status', 'is_delete', 'execute_count', 'create_time')
    list_filter = ('status', 'is_delete', 'project')
    search_fields = ('name',)
    list_per_page = 20
    
    # 编辑字段
    fields = ('name', 'project', 'env_id', 'team_id', 'status', 'is_delete', 'execute_count', 'case')
    # 只读字段
    readonly_fields = ('execute_count',)

    def get_env_name(self, obj):
        try:
            env = Env.objects.get(id=obj.env_id)
            return env.name
        except Env.DoesNotExist:
            return '-'
    get_env_name.short_description = '环境'
    get_env_name.admin_order_field = 'env_id'

    def get_team_name(self, obj):
        try:
            team = Team.objects.get(id=obj.team_id)
            return team.name
        except Team.DoesNotExist:
            return '-'
    get_team_name.short_description = '团队'
    get_team_name.admin_order_field = 'team_id'


@admin.register(TaskReport)
class TaskReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'task', 'name', 'passed', 'error', 'failure', 'skipped', 'tests', 'run_time', 'create_time')
    list_filter = ('task',)
    search_fields = ('name',)
    list_per_page = 20
    
    # 编辑字段
    fields = ('task', 'name', 'passed', 'error', 'failure', 'skipped', 'tests', 'run_time', 'report')
    # 只读字段
    readonly_fields = ('run_time', 'report')


@admin.register(ReportDetails)
class ReportDetailsAdmin(admin.ModelAdmin):
    list_display = ('id', 'result', 'class_name', 'name', 'run_time', 'create_time')
    list_filter = ('result',)
    search_fields = ('class_name', 'name')
    list_per_page = 20
    
    # 编辑字段
    fields = ('result', 'class_name', 'name', 'run_time', 'doc', 'system_out', 'system_err', 'failure_out', 'error_out', 'skipped_message')
    # 只读字段
    readonly_fields = ('run_time', 'system_out', 'system_err', 'failure_out', 'error_out')
