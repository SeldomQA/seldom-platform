from django.db import models


class Team(models.Model):
    """
    团队表
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField("团队名", max_length=200, null=False)
    email = models.TextField("团队邮箱", null=True, default="")
    is_delete = models.BooleanField('删除', default=False)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self) -> models.CharField:
        return self.name
