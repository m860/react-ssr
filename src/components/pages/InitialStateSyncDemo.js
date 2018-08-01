import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class InitialStateSyncDemo extends BasePage {
    static fetchInitialState = () => {
        return {
            message: "我是服务端同步数据"
        }
    };

    constructor(props) {
        super(props);
        this.state = props.initialState ? props.initialState : {}
    }

    render() {
        return (
            <LayoutWithNavigator>
                {this.state.message}
            </LayoutWithNavigator>
        );
    }

    componentDidMount() {
        setTimeout(async () => {
            const state = await this.fetchInitialState();
            this.setState(state);
        }, 1)
    }
}