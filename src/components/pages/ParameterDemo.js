import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class ParameterDemo extends BasePage {
    static getInitialProps = ({query, params}) => {
        return {
            query: query,
            params: params
        };
    }

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
            const data = await this.getInitialProps();
            this.setState({
                query: data.query,
                params: data.params
            });
        }, 1)
    }
}