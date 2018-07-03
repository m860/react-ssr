import React, {PureComponent} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"

export default class CodeSplit extends PureComponent {
    render() {
        return (
            <LayoutWithNavigator>
                我是一个异步页面
            </LayoutWithNavigator>
        );
    }
}