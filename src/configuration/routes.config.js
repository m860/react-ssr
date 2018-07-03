export default [
    {
        title: "首页",
        path: "/",
        component: require('../components/pages/Index').default,
        exact: true,
    }, {
        title: "Page A",
        path: "/pagea",
        component: require('../components/pages/PageA').default,
        exact: true
    }, {
        title: "Page B",
        path: "/pageb",
        component: require('../components/pages/PageB').default,
        exact: true
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
    }/*, {
        title: "Sign In",
        path: "/signin",
        component: require('../components/pages/SignIn').default,
        exact: true,
    }, {
        title: "Sign Up",
        path: "/signup",
        component: require('../components/pages/SignUp').default,
        exact: true,
    }, {
        title: "Magic Form",
        path: "/form/:type",
        component: require('../components/pages/Form').default,
        exact: true,
    }, {
        title: "Loading",
        path: "/test/loading",
        component: require('../components/pages/TestLoading').default,
        exact: true,
    }, {
        title: "日志",
        path: "/test/clientlogs",
        component: require('../components/pages/TestClientLog').default,
        exact: true,
    }, {
        title: "通知消息",
        path: "/test/toast",
        component: require('../components/pages/TestToast').default,
        exact: true,
    }, {
        title: "动画测试",
        path: "/test/transition",
        component: require('../components/pages/TestTransition').default,
        exact: true,
    }, {
        title: "Test Form",
        path: "/test/forms",
        component: require('../components/pages/TestForm').default,
        exact: true,
    }, {
        title: "加载remote data",
        path: "/test/fetchdata",
        component: require('../components/pages/TestFetchData').default,
        exact: true,
    }, {
        title: "404",
        component: require('../components/pages/NoMatch').default,
    }*/
]