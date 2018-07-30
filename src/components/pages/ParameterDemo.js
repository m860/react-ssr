import React from "react"
import LayoutWithNavigator from "../common/LayoutWithNavigator"
import BasePage from "./BasePage"

export default class ParameterDemo extends BasePage() {
    static fetchInitialState = ({query, params}) => {
        return {
            query: query,
            params: params
        };
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
}