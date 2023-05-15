## 主要技术栈

* vue.js 3.x
* naive-ui
* typescript

## Installation

* 安装项目依赖，根据`package.json`文件

```shell
> pnpm install
```

## Get Started

### 启动
> 推荐使用pnpm 或者 yarn进行调试、打包构建等操作
* dev (本地开发环境)

```shell
> pnpm dev
```

* `./src/config/base-url.ts`配置文件说明

```conf
let baseUrl = "";
let mode: string = import.meta.env.MODE;
switch (mode) {
  case "development":
    baseUrl = "http://127.0.0.1:8000"; //开发环境url
    break;
  case "production":
    baseUrl = "http://127.0.0.1:8000"; //生产环境url
    break;
}

export default baseUrl;
```

## Deploy
```shell
> pnpm build
```

打包完成后，可以配置nginx服务，代理dist/index.html

也可以使用vite启动服务
```shell
> pnpm preview
```

## 开发规范

### 命名规范

* 文件命名

> html 小写字母+横线，例如:index.html，org-list.html
> js 小写字母+横线，例如:i18n.js，en-US.js
> vue 驼峰命名，首字母大写，例如Login.vue，HeaderUser.vue

* 变量命名

> 常量 大写字母加下划线，例如:const ROLE_ADMIN='admin'
> 变量 驼峰命名，首字母小写，例如let name，let currentProject
> 方法 驼峰命名，首字母小写，例如open(){}，openDialog()

* Vue组件

> 导出名称 驼峰命名，首字母大写，例如MsUser

* 样式规范

> 均写入vue文件的<style scope></style>标签内，非全局样式必须添加scope
> 修改ElementUI的样式，仅在必要情况下写在<style></style>
> 命名 小写字母+横线，例如.menu，.header-menu，#header-top

### 定义规范

1. 文件内部顺序 JS -> HTML -> CSS 

```js
<script lang="ts">
...
</script>

<template>
...
</template>

</style>
...
</style>
```

2. TS 部分使用  setup 定义  `<script  setup lang="ts">`

```js
<script setup lang="ts">
...
</script>
```
4. 必要的变量与方法需要注释

```js
// 初始化团队列表
const initTeam = async (teamId: number) => {
  ...
}


// 保存团队
const saveTeam = () => {
  ...
}
```

5. 风格统一
  
  5.1. 不同页面 `创建` 按钮颜色、位置、大小， `编辑`/`删除` 按钮颜色、位置、大小应该统一风格。
  
  5.2. `删除` 按钮统一需要二次确认。
  
  5.3. 不同页面 弹窗（模态框）的样式、选项对齐、输入框默认提示统一风格。
