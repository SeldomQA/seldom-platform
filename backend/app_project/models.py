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
    test_num = models.IntegerField("测试文件数", default=0)
    is_clone = models.IntegerField("克隆", default=0)
    run_version = models.CharField("当前运行版本（蓝绿运行）", max_length=200, default="")

    def __str__(self):
        return self.name


class Env(models.Model):
    """
    环境管理
    说明：
    * test_type = http/web/app # seldom框架支持三种类型测试
    * env = Seldom.env  # 指定当前运行环境 env=production/develop/test
    * browser = seldom.main(browser="xxx")  # web测试，指定当前运行的浏览器 xxx=chrome/firefox/edge
    * base_url = seldom.main(base_url="xxx")  # http接口测试：指定当前运行的URL xxx=http://www.httpbin.org
    * remote selenium grid 远程节点
    """
    name = models.CharField("名称", max_length=50, null=False)
    test_type = models.CharField("环境值", max_length=20, null=True, default="http")
    env = models.CharField("环境值", max_length=50, null=True, default="")
    rerun = models.IntegerField("重跑次数", default=0)
    is_clear_cache = models.BooleanField("是否清除缓存", default=False)
    browser = models.CharField("环境值", max_length=20, null=True, default="")
    base_url = models.CharField("URL", max_length=200, null=True, default="")
    remote = models.CharField("remote", max_length=200, null=True, default="")
    app_server = models.CharField("APP服务", max_length=100, null=True, default="")
    app_info = models.CharField("APP信息", max_length=1000, null=True, default="{}")
    is_delete = models.BooleanField('删除', default=False)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
