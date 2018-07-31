import React, {Component} from "react"

export default function (component) {
    return class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                targetComponent: null
            };
        }

        render() {
            if (this.state.targetComponent) {
                const TargetComponent = this.state.targetComponent;
                return (
                    <TargetComponent {...this.props}></TargetComponent>
                );
            }
            return null;
        }

        componentDidMount() {
            Promise.all([
                component
            ]).then(result => {
                if (result.length > 0) {
                    this.setState({
                        targetComponent: result[0].default ? result[0].default : result[0]
                    });
                }
            })
        }
    }
}