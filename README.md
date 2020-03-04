# 基于 as-cli 生成的 angularjs 脚手架

## 一、前提

**基于 angularjs@1.5+ 版本**
**基于 angularjs@1.5+ 版本**
**基于 angularjs@1.5+ 版本**

基于传统的前端 H5 开发方式，主要用于*轻量级*单页面应用。

开发阶段借助 eslint / stylelint / prettier / editorconfig 工具以尽可能地统一 IDE 的配置和项目业务代码的风格、规范。

如果有任何问题，请提交 issue - 「[传送门](https://github.com/wangsiyuan0215/angualrjs-scaffold/issues/new)」。

## 二、准备工作

### 2.1. 环境要求：

* `Node.js` ，基于 LTS 长期支持的版本即可；
* `Npm` 或 `Yarn` ，包管理工具，其中 Node.js 会自带安装 Npm，但是鉴于 Npm 对于依赖包的下载时好时坏（需要翻墙），推荐使用 Yarn；
* 样式编写基于 SCSS 预编译语言，需要安装编译工具，这里推荐 「[Koala](http://koala-app.com/index-zh.html)」 或者 「[CodeKit for Mac](https://codekitapp.com/)」。

### 2.2. 环境安装：

再开始开发业务之前，请在 Terminal 或者命令行工具执行如下命令：
```
# 如果使用 Npm 进行安装
npm install

# 如果使用 Yarn 进行安装
yarn install
```
如果你想要了解更多关于 Npm 和 Yarn 方面的知识，请点击「[传送门 - Npm](https://www.npmjs.com/)」或「[传送门 - Yarn](https://yarn.bootcss.com/)」。

## 三、说明

### 3.1. 技术要求

主要基于 HTML 5、 JavaScript 5.1 和 SCSS 预编译样式语言，请注意整体项目没有编译过程，不支持 ES6 + 以上的 ECMAScript 标准。

### 3.2. 项目结构

整体项目的结构大致如下：

```javascript
root
  |-- index.html 单页面应用入口 html 文件
  |-- package.json 项目依赖包的配置文件
  |-- gulpfile.js 项目打包执行脚本
  |-- __base__ 基础库（忽略、勿动）
  |-- assets 静态图片、字体、样式资源集合
         |-- images 静态图片资源集合
         |-- styles 静态样式资源集合（.scss 和 .css 统一在此管理）
  |-- html 页面集合
  |-- scripts 脚本、业务逻辑资源集合
         |-- controllers 业务逻辑 controller 资源集合
         |-- resources 业务配置
                 |-- language 文案集合
                 |-- apis.config.js 接口集合
                 |-- config.config.js 静态参数、变量集合
                 |-- routes.config.js 路由配置
         |-- services angularjs 服务集合
         |-- vendor 项目自需要的三方库集合
         |-- main.js 项目脚本启动入口文件
```

在新建 JavaScript 文件时的命名请遵循以下规则：
* 如果新建的文件是 controller，请以 `controller.js` 为后缀命名；
* 如果新建的文件是 config，请以 `config.js` 为后缀；
* 如果新建的文件是 service，请以 `service.js` 为后缀；

**请注意，如无需要请不要随意修改项目结构，否则会出现打包后出现资源丢失、打包失败等的情况。**

## 四、部署

请确保你已经执行过 `npm install` 或 `yarn install`，安装成功后请执行 `gulp default` 命令，该命令会在当前项目的根目录下生成 `build` 文件夹，即为打包后的成果物。