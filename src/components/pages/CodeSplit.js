import React, {PureComponent} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class CodeSplit extends BasePage() {
    render() {
        return (
            <LayoutWithNavigator>
                我是一个异步页面
            </LayoutWithNavigator>
        );
    }
}