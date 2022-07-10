from django.db import models
from app_project.models import Project


class TestTask(models.Model):
    """
    测试任务表
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField("名称", max_length=100, blank=False, default="")
    status = models.IntegerField("状态", default=0)  # 0未执行、1执行中、2已执行
    is_delete = models.BooleanField("删除", default=False)
    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("创建时间", auto_now=True)

    def __str__(self):
        return self.name


class TaskCaseRelevance(models.Model):
    """
    任务用例关联表
    task 1  cases [{"moduleId":1,"casesId":[1,2]},{"moduleId":6,"casesId":[5,6]}]
    """
    task = models.ForeignKey(TestTask, on_delete=models.CASCADE)
    case = models.TextField("关联用例", null=True, default="")
    create_time = models.DateTimeField("创建时间", auto_now_add=True)


class TestResult(models.Model):
    """
    测试结果表
    """
    task = models.ForeignKey(TestTask, on_delete=models.CASCADE)
    name = models.CharField("名称", max_length=100, blank=False, default="")
    passed = models.IntegerField("通过用例", default=0)
    error = models.IntegerField("错误用例", default=0)
    failure = models.IntegerField("失败用例", default=0)
    skipped = models.IntegerField("跳过用例", default=0)
    tests = models.IntegerField("总用例数", default=0)
    run_time = models.FloatField("运行时长", default=0)
    result = models.TextField("详细", default="")
    create_time = models.DateTimeField("创建时间", auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-create_time']
