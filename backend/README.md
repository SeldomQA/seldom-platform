# django-ninja
基于django 的后端项目。

## 主要技术栈
* django
* django-ninja
* seldom

## 安装

* 安装依赖

```shell
> pip install -r requirements.txt
```

* 执行数据库同步

```
> python manage.py makemigrations
> python manage.py migrate
```
 * 安装redis
```
> windows版: https://github.com/tporadowski/redis
> linux版：https://github.com/redis/redis
```
## 启动

```shell
> python manage.py runserver
```
```shell
> .\redis-server
```
## 查看接口

* 浏览器访问：http://localhost:8000/api/docs

![](./api.png)

