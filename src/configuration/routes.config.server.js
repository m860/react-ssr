export default [
    {
        title: "首页",
        path: "/",
        component: require('../components/pages/Index').default,
        exact: true,
    }, {
        title: "服务端异步数据",
        path: "/demo/initialstateasync",
        component: require('../components/pages/InitialStateAsyncDemo').default,
        exact: true
    }, {
        title: "服务端同步数据",
        path: "/demo/initialstatesync",
        component: require("../components/pages/InitialStateSyncDemo").default,
        exact: true
    }, {
        title: "异步组件实现CodeSplit",
        path: "/demo/codesplit",
        component: require("../components/pages/CodeSplit").default,
        exact: true
    }, {
        title: "404",
        component: require("../components/pages/Http404").default,
        exact: true
    }
]