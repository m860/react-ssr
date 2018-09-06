import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import PropTypes from "prop-types"

export default class InitialStateSyncDemo extends Component {
    static getInitialProps = () => {
        return {
            message: "我是服务端同步数据"
        }
    };

    static propTypes={
        message:PropTypes.string
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