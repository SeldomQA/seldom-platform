from django.db import models


class Project(models.Model):
    """
    项目表
    """
    name = models.CharField("名称", max_length=50, null=False)
    address = models.CharField("项目地址", max_length=200, null=False)
    is_delete = models.BooleanField("删除", null=True, default=False)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    cover_name = models.CharField("封面名称", max_length=64, default="")
    path_name = models.CharField("封面路径名称", max_length=64, default="")

    def __str__(self):
        return self.name
