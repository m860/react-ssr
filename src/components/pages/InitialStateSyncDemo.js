import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class InitialStateSyncDemo extends BasePage() {
    static fetchInitialState = () => {
        return {
            message: "我是服务端同步数据"
        }
    };

    render() {
        return (
            <LayoutWithNavigator>
                {this.state.message}
            </LayoutWithNavigator>
        );
    }
}