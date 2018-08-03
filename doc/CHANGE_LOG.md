# change logs

## 2018-8-3

- 数据初始化的定义由`static fetchInitialState`变为`static getInitialProps`
- `_INITIAL_STATE_`修改为`_INITIAL_PROPS_`,数据结构也做了调整
- 如果第一次渲染的页面时异步页面,在客户端渲染使用`render`,否则使用`hyrate`
- 所有的异步页面在服务端都会做同步处理,因此服务端不会存在异步访问的页面
- 调整了`state`的初始化方式

## 2018-8-1

- 把服务端和客户端的路由配置合并成一个文件了
- 调整了异步页面的实现,之前的异步页面使用路由的render,现在使用HOC的方式实现.
    ```json
    [{
        path: "/同步",
        component: require('../components/pages/Index'),
        exact: true,
    },{
        path: "/异步",
        component: import('../components/pages/Index'),
        exact: true,
    }]
    ```
- 异步页面支持服务端render
- 移除了依赖项`@m860/react-async-component`