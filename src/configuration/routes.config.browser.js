import React from "react"
import AsyncComponent from "@m860/react-async-component"

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
    }, {
        title: "404",
        render: props => {
            return (
                <AsyncComponent components={[
                    import("../components/pages/Http404")
                ]}>
                    {(Http404) => {
                        return (
                            <Http404 {...props}/>
                        );
                    }}
                </AsyncComponent>
            );
        },
        exact: true
    }
]