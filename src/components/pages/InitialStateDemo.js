import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"

export default class InitialStateDemo extends Component {
    static fetchInitialState = () => {
        return Promise.resolve({
            message: "我是服务端渲染出来的数据"
        })
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

    async fetchData() {
        const state = await InitialStateDemo.fetchInitialState();
        if (state.message !== this.state.message) {
            this.setState({
                message: state.message
            });
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }
}