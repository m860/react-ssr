import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import PropTypes from "prop-types"

export default class InitialStateAsyncDemo extends Component {
    static getInitialProps = () => {
        return Promise.resolve({
            message: "我是服务端异步数据"
        })
    };
    static propTypes = {
        message: PropTypes.any
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
        // setTimeout(async () => {
        //     const data = await this.getInitialProps();
        //     this.setState({
        //         message: data.message
        //     });
        // }, 1)
    }
}