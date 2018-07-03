import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"

export default class InitialStateAsyncDemo extends Component {
    static fetchInitialState = () => {
        return Promise.resolve({
            message: "我是服务端异步数据"
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

    async initialDataAsync() {
        const state = await InitialStateAsyncDemo.fetchInitialState();
        this.setState(state);
    }

    async componentDidMount() {
        await this.initialDataAsync();
    }

}