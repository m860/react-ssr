# React SSR

react server-slide render 工程, bundle使用webpack 4.

[![Build Status](https://travis-ci.org/m860/react-ssr.svg?branch=master)](https://travis-ci.org/m860/react-ssr)
[![Coverage Status](https://coveralls.io/repos/github/m860/react-ssr/badge.svg?branch=master)](https://coveralls.io/github/m860/react-ssr?branch=master)


## 运行工程

```shell
$ git clone https://github.com/m860/react-ssr.git
$ cd react-ssr
$ npm install
$ npm run build:dll
$ npm start
```

> 一般在开发阶段都使用`npm start`,App以`SPA`的方式运行,路由是`HashRouter`
> `npm start`能够正常运行不代表`npm run start:ssr`能够正常运行,可能有一些细微的差别,因此发布之前最好在`npm run start:ssr`下测试下

## 编译工程

```shell
$ npm run build:dll # 如果没有build dll 需要先运行此步骤
$ npm run build
```

## npm command

- `npm start`:开发阶段,App以`SPA`的方式运行,路由使用`HashRouter`,`HMR`可用
- `npm run start:ssr`:开发阶段,App以`SSR`的方式运行,路由使用`BrowserRouter`,`HMR`不可用
- `npm run build:dll`:打包公共库
- `npm run build:ssr`:打包生产环境,App使用`SSR`的方式运行,路由使用`BrowserRouter`
- `npm run build:spa`:打包生产环境,App使用`SPA`的方式运行,路由使用`HashRouter`

## 数据渲染

```javascript
import React from "react"
import BasePage from "./BasePage"

export default class PageDemo extends BasePage(){
    static getInitialProps=()=>{
        return {
            message:"hello SSR"
        };
    }
    constructor(props){
        super(props);
        this.state={
            message:props.message
        };
    }
    render(){
        return (
            <div>
                {this.state.message}
            </div>
        );
    }
}
```

## 如何配置路由?

路由的配置在文件`routes.config.js`中,如下面代码所示

```javascript
export default [
    {
        title: "首页",
        path: "/",
        component: require('../components/pages/Index'),
        exact: true,
    }, {
        title: "服务端异步数据",
        path: "/demo/initialstateasync",
        component: require('../components/pages/InitialStateAsyncDemo'),
        exact: true
    }, {
        title: "异步组件实现CodeSplit",
        path: "/demo/codesplit",
        component: import("../components/pages/CodeSplit"),
        exact: true
    }, {
        title: "404",
        component: require("../components/pages/Http404"),
        exact: true
    }
]
```

## TODO

## 平台说明

- `.browser.js`使用于浏览器
- `.server.js`使用于node服务端
- `.js`使用于浏览器和node服务端

> PS:目前没有处理空引用的问题,如果要分平台创建必须为每个平台创建对应的文件,如果某一个平台没有对应的实现需要进行mock实现



