from django.contrib import admin

from app_project.models import Project, Env


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
    'id', 'name', 'address', 'case_dir', 'is_delete', 'is_clone', 'run_version', 'test_num', 'create_time')
    list_filter = ('is_delete', 'is_clone')
    search_fields = ('name', 'address')
    list_per_page = 20

    # 编辑字段
    fields = ('name', 'address', 'case_dir', 'is_delete', 'is_clone', 'run_version', 'test_num')
    # 只读字段
    readonly_fields = ('is_clone', 'run_version', 'test_num')


@admin.register(Env)
class EnvAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'test_type', 'env', 'browser', 'base_url', 'remote', 'is_delete', 'create_time')
    list_filter = ('test_type', 'is_delete')
    search_fields = ('name',)
    list_per_page = 20

    # 编辑字段
    fields = ('name', 'test_type', 'env', 'browser', 'base_url', 'remote', 'is_delete')
