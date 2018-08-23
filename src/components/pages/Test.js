import React, {Component, PureComponent} from "react"
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import PropTypes from "prop-types"

class A0 extends Component {
    static propTypes = {
        message: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.a2 = null;
    }

    render() {
        console.log("A0 render");
        return (
            <div>
                <p>我是A0</p>
                {/*<A1 message={this.props.message}></A1>*/}
                <button type="button" onClick={() => {
                    if (this.a2) {
                        this.a2.setMessage("hello A2");
                    }
                }}>设置A2的message
                </button>
                <A2 ref={ref => this.a2 = ref}></A2>
            </div>
        );
    }

    shouldComponentUpdate(nextProps) {
        if (this.a2) {
            this.a2.setMessage(nextProps.message);
        }
        return false;
    }

}

class A1 extends Component {
    static propTypes = {
        message: PropTypes.string
    };

    render() {
        console.log('A1 render');
        return (
            <div>
                <p>我是A1:{this.props.message}</p>
            </div>
        );
    }
}

class A2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    setMessage(value) {
        this.setState({
            message: value
        })
    }

    render() {
        console.log('A2 render');
        return (
            <div>
                <p>我是A2:{this.state.message}</p>
            </div>
        );
    }
}

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            message: ""
        };
    }

    render() {
        console.log('Test render')
        return (
            <LayoutWithNavigator>
                <button type="button" onClick={() => {
                    this.setState({
                        count: 1
                    }, () => {
                        console.log('call setState callback 1')
                    });
                    this.setState({
                        count: 1
                    }, () => {
                        console.log('call setState callback 2')
                    })
                }}>setState same value twice
                </button>
                <div>
                    <button type="button" onClick={() => {
                        this.setState({
                            message: "hello A"
                        })
                    }}>send message
                    </button>
                    <A0 message={this.state.message}></A0>
                </div>
            </LayoutWithNavigator>
        );
    }

    componentWillUpdate() {
        console.log("Test will update")
    }

    componentDidUpdate() {
        console.log("Test did update")
    }
}