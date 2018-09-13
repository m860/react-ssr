import React, {Component} from 'react'
import {Provider} from "react-redux";
import ApplicationSetting from './common/ApplicationSetting'
import Toast from './common/Toast'
import store from "../libs/store"
import PropTypes from "prop-types"
import {matchPath, Route, Switch} from "react-router-dom";

export default class App extends Component {

    static propTypes = {
        routes: PropTypes.array,
        initialProps: PropTypes.shape({
            path: PropTypes.string,
            props: PropTypes.any
        })
    };

    static defaultProps = {
        routes: []
    };

    _renderRoutes() {
        if (this.props.routes.length > 0) {
            return (
                <Switch>
                    {this.props.routes.map((item, index) => {
                        return (
                            <Route key={index.toString()}
                                   render={props => {
                                       if (this.props.initialProps) {
                                           const matched = matchPath(this.props.initialProps.path, {
                                               path: item.path,
                                               exact: item.exact
                                           });
                                           if (matched) {
                                               return (
                                                   <item.component {...props} {...(this.props.initialProps.props ? this.props.initialProps.props : {})}></item.component>
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
            );
        }
        return null;
    }

    render() {
        return (
            <Provider store={store}>
				<span>
					<ApplicationSetting>
                        {this._renderRoutes()}
					</ApplicationSetting>
					<Toast/>
				</span>
            </Provider>
        );
    }
}