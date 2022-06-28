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
