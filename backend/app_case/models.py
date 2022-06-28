from django.db import models
from app_project.models import Project


class TestCase(models.Model):
    """
    测试类&用例
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file_name = models.CharField("文件名", max_length=200, null=False, default="")
    class_name = models.CharField("类名", max_length=100, null=False, default="")
    class_doc = models.TextField("类描述", null=True, blank=True, default="")
    case_name = models.CharField("方法名", max_length=100, null=False, default="")
    case_doc = models.TextField("方法描述", null=True, blank=True, default="")
    report = models.CharField("报告", max_length=50, null=True, default="")
    status = models.IntegerField("状态", default=0)  # 0未执行、1执行中、2已执行
    result = models.CharField("结果", max_length=50, null=True, default="")
    system_out = models.TextField("日志", null=True, default="")
    error = models.TextField("错误信息", null=True, default="")
    run_time = models.FloatField("运行时长", default=0)
    create_time = models.DateTimeField("创建时间", auto_now_add=True)
    update_time = models.DateTimeField("更新时间", auto_now=True)

    def __str__(self):
        return self.case_name
