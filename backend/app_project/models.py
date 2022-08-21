from django.db import models


class Project(models.Model):
    """
    项目表
    """
    name = models.CharField("名称", max_length=50, null=False)
    address = models.CharField("项目地址", max_length=200, null=False)
    case_dir = models.CharField("用例目录", max_length=200, default="test_dir")
    is_delete = models.BooleanField("删除", null=True, default=False)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    cover_name = models.CharField("封面名称", max_length=64, default="")
    path_name = models.CharField("封面路径名称", max_length=64, default="")
    test_num = models.IntegerField("文件数", default=0)

    def __str__(self):
        return self.name


class Env(models.Model):
    """
    环境管理
    说明：
    * env = Seldom.env  # 指定当前运行环境 env=production/develop/test
    * browser = seldom.main(browser="xxx")  # web测试，指定当前运行的浏览器 xxx=chrome/firefox/edge
    * base_url = seldom.main(base_url="xxx")  # http接口测试：指定当前运行的URL xxx=http://www.httpbin.org
    """
    name = models.CharField("名称", max_length=50, null=False)
    env = models.CharField("环境值", max_length=50, null=True, default="")
    browser = models.CharField("环境值", max_length=20, null=True, default="")
    base_url = models.CharField("URL", max_length=200, null=True, default="")
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
