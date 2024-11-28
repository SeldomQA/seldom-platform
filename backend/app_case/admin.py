from django.contrib import admin
from app_case.models import TestCase, CaseResult, TestCaseTemp


@admin.register(TestCase)
class TestCaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'file_name', 'class_name', 'case_name', 'status', 'create_time')
    list_filter = ('status', 'project')
    search_fields = ('file_name', 'class_name', 'case_name')
    list_per_page = 20
    
    # 编辑字段
    fields = ('project', 'file_name', 'class_name', 'class_doc', 'case_name', 'case_doc', 'status')
    # 只读字段
    readonly_fields = ('case_hash',)


@admin.register(CaseResult)
class CaseResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'case', 'name', 'passed', 'error', 'failure', 'skipped', 'tests', 'run_time', 'create_time')
    list_filter = ('case',)
    search_fields = ('name',)
    list_per_page = 20
    
    # 编辑字段
    fields = ('case', 'name', 'passed', 'error', 'failure', 'skipped', 'tests', 'run_time', 'report', 'system_out')
    # 只读字段
    readonly_fields = ('run_time', 'report', 'system_out')


@admin.register(TestCaseTemp)
class TestCaseTempAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'file_name', 'class_name', 'case_name', 'create_time')
    list_filter = ('project',)
    search_fields = ('file_name', 'class_name', 'case_name')
    list_per_page = 20
    
    # 编辑字段
    fields = ('project', 'file_name', 'class_name', 'class_doc', 'case_name', 'case_doc')
    # 只读字段
    readonly_fields = ('case_hash',)
