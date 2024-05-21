# Generated by Django 4.2.11 on 2024-05-21 14:38

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Team",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=200, verbose_name="团队名")),
                ("email", models.TextField(default="", null=True, verbose_name="团队邮箱")),
                ("is_delete", models.BooleanField(default=False, verbose_name="删除")),
                ("create_time", models.DateTimeField(auto_now_add=True)),
                ("update_time", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
