# change logs

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