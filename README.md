# seldom-platform

> Based on the seldom formwork test platform.

基于seldom框架的测试平台。 

>  这根传统的测试平台非常不一样，传统的测试平台创建用例是非常低效的，也非常不灵活。但是，平台的优势在于维护测试用例的用例的管理，定时任务，以及结果的可视化管理。selenium-platform可以解析seldom框架编写的自动化用例。~ 这是一个完美的方案。


## seldomQA 架构

![](./architecture.png)


🐍 **seldom**

> 通过seldom框架编写自动化测试用例。

![](./img/seldom-code.png)

🌐 **Github/gitee托管项目代码**

![](./img/github.png)

💻 **seldom-platfrom**

> 通过seldom-platfrom平台解析用例，执行、查看结果、定时任务...

![](./img/seldom-platform-code.png)

## ToDo

* 支持测试类型：

| 功能      |  进度 |
| --------- | ---- |
| API       | ✔️    |
| Web UI    | ✔️    |
| App UI    | ❌    |

* 功能：

| 功能      | 子模块   | 进度 |
| --------- | -------- | ---- |
| 登录&注册 | -        | ✔️    |
| 配置中心  | 项目配置 | ✔️    |
| -         | 环境配置 | ✔️    |
| -         | 团队配置 | ✔️    |
| 项目管理  | 用例管理 | ✔️    |
| -         | 任务管理 | ✔️    |
| 定时任务  | ..       | 开发中..     |

## Project

| 项目         | 说明                               | 文档                           |
| ------------ | ---------------------------------- | ------------------------------ |
| backend      | 后端: django + django-ninjia        | [link](./backend/README.md)    |
| frontendv3   | 前端：vue3 + naive-ui               | [link](./frontendv3/README.md) |
| ~~frontend~~ | 前端：vue2 + element-ui (不再维护)   | [link](./frontend/README.md)   |


> __注：__
> `frontend` 和 `frontendv3` 是两套并行开发前端项目，frontend 不再维护，推荐使用 frontendv3。

## Online experience

体验地址：http://seldom.testpub.cn/  （暂无法访问）

* QQ官方交流群：948994709

* 微信（WeChat）

> 欢迎添加微信，交流和反馈问题。

<div style="display: flex;justify-content: space-between;width: 100%">
    <p><img alt="微信" src="wechat.jpg" style="width: 250px;height: 100%" ></p>
</div>

## Function

[《seldom-platform平台使用手册》](https://www.yuque.com/chongshi/raflru/ghot2m)
