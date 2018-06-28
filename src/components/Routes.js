import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import routes from "../configuration/routes.config"
import PropTypes from "prop-types"
import injectState from "../libs/injectState";

/**
 * Routes必须继承Component,如果使用PureComponent导致客户端路由失效
 */
export default class Routes extends Component {
    static contextTypes = {
        initialState: PropTypes.any
    };

    render() {
        return (
            <Switch>
                {routes.map((item, index) => {
                    const routeProps = {
                        key: index,
                        ...(item.path ? {path: item.path} : {}),
                        component: injectState(item.component, this.context.initialState),
                        exact: item.exact || false
                    };
                    return (
                        <Route {...routeProps}></Route>
                    );
                })}
            </Switch>
        );
    }
}