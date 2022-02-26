from django.db import models


class Project(models.Model):
    """
    项目表
    """
    name = models.CharField("名称", max_length=50, null=False)
    project_name = models.CharField("项目名称", max_length=50, null=False)
    is_delete = models.BooleanField("状态", null=True, default=False)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class File(models.Model):
    """
    测试目录&文件
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField("名称", max_length=100, null=False, default="")
    create_time = models.DateTimeField("创建时间", auto_now_add=True)

    def __str__(self):
        return self.name


class Case(models.Model):
    """
    测试类&用例
    """
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    class_name = models.CharField("类名", max_length=100, null=False, default="")
    class_doc = models.TextField("类描述", null=True, blank=True, default="")
    case_name = models.CharField("方法名", max_length=100, null=False, default="")
    case_doc = models.TextField("方法描述", null=True, blank=True, default="")
    create_time = models.DateTimeField("创建时间", auto_now_add=True)

    def __str__(self):
        return self.case_name


