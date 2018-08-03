import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class InitialStateSyncDemo extends BasePage {
    static getInitialProps = () => {
        return {
            message: "我是服务端同步数据"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            message: props.message
        }
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
            const data = await this.getInitialProps();
            this.setState({
                message: data.message
            });
        }, 1)
    }
}