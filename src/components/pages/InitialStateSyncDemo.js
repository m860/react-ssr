import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class InitialStateSyncDemo extends BasePage() {
    static fetchInitialState = () => {
        return {
            message: "我是服务端同步数据"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    render() {
        return (
            <LayoutWithNavigator>
                {this.state.message}
            </LayoutWithNavigator>
        );
    }

    initialData() {
        setTimeout(() => {
            const state = this.callFetchInitialState(InitialStateSyncDemo);
            this.setState(state);
        }, 1);
    }

    componentDidMount() {
        this.initialData();
    }
}