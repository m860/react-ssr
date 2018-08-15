import React, {Component, PureComponent} from "react"
import LayoutWithNavigator from '../common/LayoutWithNavigator'

export default class Test extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        console.log('render')
        return (
            <LayoutWithNavigator>
                <button type="button" onClick={() => {
                    this.setState({
                        count: 3
                    }, () => {
                        console.log('call setState callback 1')
                    });
                    this.setState({
                        count: 4
                    },()=>{
                        console.log('call setState callback 2')
                    })
                }}>count++
                </button>
                <div>{this.state.count}</div>
            </LayoutWithNavigator>
        );
    }

    componentWillUpdate() {
        console.log("will update")
    }

    componentDidUpdate() {
        console.log("did update")
    }
}