"""
配置文件
"""
# 定时任务服务
TIMED_SERVER = "http://172.17.0.1:8006"
# 本机服务
THIS_SERVER = "http://172.17.0.1:8005"


class EmailConfig:
    """
    测试任务：发送邮箱账号配置
    """
    user = "xxxx@gmail.com"
    password = "abc123"
    host = "smtp.gmail.com"
