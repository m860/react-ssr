import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import routes from "../configuration/routes.config"
import PropTypes from "prop-types"
import injectState from "../libs/decorators/injectState";

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
                    let routeProps = {
                        key: index,
                        exact: item.exact || false
                    };
                    if (item.path) {
                        routeProps.path = item.path;
                    }
                    if (item.component) {
                        routeProps.component = injectState(item.component, this.context.initialState);
                    }
                    else if (item.render) {
                        routeProps.render = item.render;
                    }
                    else if (item.children) {
                        routeProps.children = item.children;
                    }
                    else {
                        throw new Error("路由配置必须配置以下属性之一:component,render,children");
                    }
                    return (
                        <Route {...routeProps}></Route>
                    );
                })}
            </Switch>
        );
    }
}