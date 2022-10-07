from django.db import models
from app_project.models import Project
from app_case.models import TestCase


class TestTask(models.Model):
    """
    测试任务
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField("任务名", max_length=200, null=False, default="")
    status = models.IntegerField("状态", default=0)  # 0未执行、1执行中、2已执行
    env_id = models.IntegerField("环境ID", null=True)
    team_id = models.IntegerField("团队ID", null=True)
    email = models.CharField("发送告警邮箱", max_length=100, null=True)
    timed = models.CharField("定时任务", max_length=50, null=True, default="")
    execute_count = models.IntegerField("执行次数", null=True, default=0)
    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return self.name


class TaskCaseRelevance(models.Model):
    """
    任务用例关联表
    """
    task = models.ForeignKey(TestTask, on_delete=models.CASCADE)
    case = models.ForeignKey(TestCase, on_delete=models.CASCADE)
    create_time = models.DateTimeField("创建时间", auto_now_add=True)


class TaskReport(models.Model):
    """
    测试任务报告
    """
    task = models.ForeignKey(TestTask, on_delete=models.CASCADE)
    name = models.CharField("名称", max_length=500, blank=False, default="")
    report = models.TextField("报告内容", null=True, default="")
    passed = models.IntegerField("通过用例", default=0)
    error = models.IntegerField("错误用例", default=0)
    failure = models.IntegerField("失败用例", default=0)
    skipped = models.IntegerField("跳过用例", default=0)
    tests = models.IntegerField("总用例数", default=0)
    run_time = models.CharField("运行时长",  max_length=100, default="0")
    create_time = models.DateTimeField("创建时间", auto_now_add=True)

    def __str__(self):
        return self.name


class ReportDetails(models.Model):
    """
    任务报告详情
    """
    result = models.ForeignKey(TaskReport, on_delete=models.CASCADE)
    class_name = models.CharField("用例类称", max_length=500, blank=False, default="")
    name = models.CharField("用例名称", max_length=500, blank=False, default="")
    run_time = models.CharField("运行时长", max_length=100, default="0")
    doc = models.TextField("用例描述", null=True, default="")
    system_out = models.TextField("用例日志", null=True, default="")
    system_err = models.TextField("用例错误", null=True, default="")
    failure_out = models.TextField("用例错误", null=True, default="")
    error_out = models.TextField("用例错误", null=True, default="")
    skipped_message = models.TextField("用例错误", null=True, default="")
    create_time = models.DateTimeField("创建时间", auto_now_add=True)

    def __str__(self):
        return self.name
