import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"
import PropTypes from "prop-types"

export default class InitialStateAsyncDemo extends BasePage {
    static fetchInitialState = () => {
        return Promise.resolve({
            message: "我是服务端异步数据"
        })
    };
    static propTypes = {
        initialState: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = props.initialState ? props.initialState : {};
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