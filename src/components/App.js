import React, {Component} from 'react'
import {Provider} from "react-redux";
import ApplicationSetting from './common/ApplicationSetting'
import Toast from './common/Toast'
import store from "../libs/store"
import PropTypes from "prop-types"
import routeConfig from "../configuration/routes.config"
import generateAsyncComponent from "../libs/decorators/generateAsyncComponent";
import {matchPath, Switch, Route} from "react-router-dom";

export default class App extends Component {

    static propTypes = {
        routes: PropTypes.array,
        initialState: PropTypes.shape({
            path: PropTypes.string,
            state: PropTypes.any
        })
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
            <Provider store={store}>
				<span>
					<ApplicationSetting>
                        <Switch>
                            {this.routes.map((item, index) => {
                                return (
                                    <Route key={index.toString()}
                                           render={props => {
                                               if (this.props.initialState) {
                                                   const matched = matchPath(this.props.initialState.path, {
                                                       path: item.path,
                                                       exact: item.exact
                                                   });
                                                   if (matched) {
                                                       return (
                                                           <item.component {...props}
                                                                           initialState={this.props.initialState.state}></item.component>
                                                       );
                                                   }
                                               }
                                               return (
                                                   <item.component {...props}></item.component>
                                               );
                                           }}
                                           strict={item.strict}
                                           exact={item.exact}
                                           path={item.path}></Route>
                                );
                            })}
                        </Switch>
					</ApplicationSetting>
					<Toast/>
				</span>
            </Provider>
        );
    }
}