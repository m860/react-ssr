import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"

export default class InitialStateSyncDemo extends Component {
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
            const state = InitialStateSyncDemo.fetchInitialState();
            this.setState(state);
        }, 1);
    }

    componentDidMount() {
        this.initialData();
    }
}