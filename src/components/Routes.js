import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import routeConfig from "../configuration/routes.config"
import PropTypes from "prop-types"
import generateAsyncComponent from "../libs/decorators/generateAsyncComponent";

/**
 * Routes必须继承Component,如果使用PureComponent导致客户端路由失效
 */
export default class Routes extends Component {
    static propTypes = {
        routes: PropTypes.array
    };

    get routes() {
        if (this.props.routes) {
            return this.props.routes;
        }
        else {
            return routeConfig.map((item) => {
                let routeProps = {
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
                return routeProps;
            })
        }
    }

    render() {
        return (
            <Switch>
                {this.routes.map((item, index) => {
                    return (
                        <Route key={index.toString()} {...item}></Route>
                    );
                })}
            </Switch>
        );
    }
}