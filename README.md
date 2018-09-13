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

## 服务端数据渲染

先看一个简单的例子

```javascript
import React,{Component} from "react"

export default class PageDemo extends Component{
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

`getInitialProps`方法包含一个参数,结构如下:

```javascript
static getInitialProps({query,params}){
    ...
}
```

- query: query参数,对应服务端和客户端的query
- params: params参数,对应服务端和客户端的params

在服务端运行的时候`getInitialProps`由系统自动调用,如果是在客户端执行需要自己手动调用,

```javascript
import {getInitialProps} from "libs/helpers/ssr.js"

export default class XXX extends Component{
    componentDidMount(){
        const initialProps=getInitialProps(this);
        ...
    }
}

```

## 路由配置

- 路由的配置在文件`routes.config.js`中

```javascript
export default [
    {
        //名称
        title: ?String,
        //路径
        path: String,
        //组件
        component: Component|Promise<Component>,
        //是否使用精确匹配
        exact: Boolean,
    }
]
```

- 异步路由的配置使用import,例如:

```javascript
export default [
    {
        title:"Async Route Config",
        path:"/async/route",
        component:import("COMPONENT_PATH"),
        exact:true
    }
]
```

- [ ] 嵌套路由

## TODO

## 平台说明

- `.browser.js`使用于浏览器
- `.server.js`使用于node服务端
- `.js`使用于浏览器和node服务端

> PS:目前没有处理空引用的问题,如果要分平台创建必须为每个平台创建对应的文件,如果某一个平台没有对应的实现需要进行mock实现



