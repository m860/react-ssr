export default [
    {
        title: "登录",
        path: "/signin",
        component: import("../components/pages/SignIn"),
        exact: true
    }, {
        title: "Test",
        path: "/demo/test",
        component: require("../components/pages/Test"),
        exact: true
    }, {
        title: "服务端异步数据",
        path: "/demo/initialstateasync",
        component: require('../components/pages/InitialStateAsyncDemo'),
        exact: true
    }, {
        title: "服务端同步数据",
        path: "/demo/initialstatesync",
        component: require("../components/pages/InitialStateSyncDemo"),
        exact: true
    }, {
        title: "Toast Example",
        path: "/demo/toast",
        component: require("../components/pages/Toast"),
        exact: true
    }, {
        title: "Loading Example",
        path: "/demo/loading",
        component: require("../components/pages/Loading"),
        exact: true
    }, {
        title: "Query Example",
        path: "/demo/query",
        component: require("../components/pages/ParameterDemo"),
        exact: true
    }, {
        title: "Params Example",
        path: "/demo/query/:id",
        component: require("../components/pages/ParameterDemo"),
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