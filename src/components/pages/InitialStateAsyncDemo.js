import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class InitialStateAsyncDemo extends BasePage() {
    static fetchInitialState = () => {
        return Promise.resolve({
            message: "我是服务端异步数据"
        })
    };

    render() {
        return (
            <LayoutWithNavigator>
                {this.state.message}
            </LayoutWithNavigator>
        );
    }
}