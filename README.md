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

## 如何实现服务端页面渲染前数据的初始化?

在实现这个功能的时候使用了injectState,`<Route/>`对应的component需要注入初始化数据(state),
如果component在服务端进行渲染我们就需要提供初始化的state,其具体逻辑是在component.fetchInitialState这个静态函数里实现的,
因此我们定义的所有页面(其实也是组件)都需要实现其`fetchInitialState`这个方法.
如果component在客户端渲染,这个state永远都为null,完整例子可以参考

- [InitialStateAsyncDemo.js](./src/components/pages/InitialStateAsyncDemo.js)
- [InitialStateSyncDemo.js](./src/components/pages/InitialStateSyncDemo.js)
- [ParameterDemo.js](./src/components/pages/ParameterDemo.js)

> fetchInitialState 方法包含一个参数,其结构如下:

```type
type fetchInitialStateParams={
    query:?object,
    params:?object
};
```

需要注意一点,从服务端返回的html是包含了数据的完整html,一旦请求返回客户端会根据SPA的模式再次初始化数据再进行渲染,
所以在`componentDidMount`中需要做对应的数据初始化.

## 如何配置路由?

客户端和服务端的路由配置是分开配置的,分别在`routes.config.browser.js`和`routes.config.server.js`中,
分开配置的主要原因是因为客户端的页面需要处理code split而服务端不需要处理.

> 路由配置的属性除了`title`是自定义外,其他的属性配置都来源于`react-router/Route`中

> 服务端在启动的时候会对服务端和客户端的路由配置做一致性验证

### 如何实现code split

异步组件使用`@m860/react-async-component`实现,这是一个HOC组件.代码片段如下:

```javascript
{
    title: "Code Split",
    path: "/demo/codesplit",
    render: props => {
        return (
            <AsyncComponent components={[
                import("../components/pages/CodeSplit")
            ]}>
                {(CodeSplit) => {
                    return (
                        <CodeSplit {...props}/>
                    );
                }}
            </AsyncComponent>
        );
    },
    exact: true
}
```

> PS:服务端不能使用异步组件

## TODO

## 平台说明

- `.browser.js`使用于浏览器
- `.server.js`使用于node服务端
- `.js`使用于浏览器和node服务端

> PS:目前没有处理空引用的问题,如果要分平台创建必须为每个平台创建对应的文件,如果某一个平台没有对应的实现需要进行mock实现



