import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import routes from "../configuration/routes.config"
import PropTypes from "prop-types"
import generateAsyncComponent from "../libs/decorators/generateAsyncComponent";

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
                    if (item.component instanceof Promise) {
                        routeProps.component = generateAsyncComponent(item.component);
                    }
                    else {
                        routeProps.component = item.component.default ? item.component.default : item.component;
                    }
                    return (
                        <Route {...routeProps}></Route>
                    );
                })}
            </Switch>
        );
    }
}