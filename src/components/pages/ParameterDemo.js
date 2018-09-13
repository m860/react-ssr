import React, {Component} from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import PropTypes from "prop-types"
import {getInitialProps} from "../../libs/helpers/ssr";

export default class ParameterDemo extends Component {
    static getInitialProps = ({query, params}) => {
        return {
            query: query,
            params: params
        };
    }

    static propTypes = {
        query: PropTypes.any,
        params: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            query: props.query,
            params: props.params
        }
    }

    render() {
        return (
            <LayoutWithNavigator>
                <a href="/demo/query?name=1">query string name=1</a><br/>
                query string {JSON.stringify(this.state.query)}<br/>
                params {JSON.stringify(this.state.params)}
            </LayoutWithNavigator>
        );
    }

    componentDidMount() {
        setTimeout(async () => {
            const data = getInitialProps(this);
            this.setState({
                query: data.query,
                params: data.params
            });
        }, 1)
    }
}