# django-ninja

基于django 的后端项目。

## 主要技术栈

* django
* django-ninja
* seldom

## 安装

### 安装依赖库

```shell
> pip install -r requirements.txt
```

### 执行数据库同步(可选)

> 如果需要干净的数据库，删除 `dev.sqlite3` 数据库文件，执行下面的步骤。

```bash
> python manage.py makemigrations
> python manage.py migrate
> python manage.py collectstatic  # 迁移静态资源: static -> staticfiles

> python .\manage.py createsuperuser  # 创建管理员账号
用户名 (leave blank to use 'user'): guest
电子邮件地址: guest@gmail.com
Password:
Password (again):
Superuser created successfully.
```

* `makemigrations` 命令用于检测你对模型（models）所做的更改，并创建一个或多个迁移文件，这些文件描述了将这些更改应用到数据库所需的步骤。
* `migrate` 命令用于将 `makemigrations` 命令生成的迁移文件应用到数据库中。
* `createsuperuser` 命令用户创建超级管理员账号。

### 运行Redis

> 可以根据自己的平台选择安装Redis.

- Windows: https://github.com/tporadowski/redis
- Linux：https://github.com/redis/redis

```shell
> redis-server  # 启动redis
```

## 运行&部署

### 开发运行

```shell
> python manage.py runserver
```

### 传统部署运行

> 部署事项：
> 1. uwsgi 仅支持在Linux上安装，用pip安装。
> 2. 修改`uwsgi.ini` 中项目路径，带 `->` 配置项需要修改。
> 3. 关闭 `backend/setting.py` 文件中设置 `debug=False`。

* 安装 uwsgi

```shell
> pip install uwsgi
```

* 命令启动

```shell
> uwsgi --http 127.0.0.1:8000 --chdir /home/app/seldom-platform/backend/ --wsgi-file backend/wsgi.py --master --processes 4 --threads 2
```

配置文件启动（参考`uwsgi.ini`文件）

```shell
> uwsgi --ini uwsgi.ini &
```

### 更多部署配置

* Supervisor管理后端进程（待补充）
* Web测试服务需要使用 docker-selenium

[点击查看](./docs/deploy.md)

## 查看接口

* 浏览器访问：http://localhost:8000/api/docs

![](./api.png)

* 健康检查接口：http://localhost:8000/api/ping


### docker部署：

1. 将后端打包成镜像：

```bash
cd seldom-platform/backend/
docker build -t seldom-backend .
```

2. 启动容器：

```bash
docker run -d --name seldom-backend -p 8000:8000 seldom-backend
```

3. `setting.py` 修改Redis的地址

```py
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://host.docker.internal:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}
```


4. [可选]使用docker-compose 启动
```shell
docker-compose up -d
```
