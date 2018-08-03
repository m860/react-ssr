import React from 'react'
import Base,{PureBase} from '../Base'
import PropTypes from 'prop-types'
import Layout from './Layout'
import Navigator from './Navigator'
import routes from "../../configuration/routes.config"
import {Link} from "react-router-dom"

export default class LayoutWithNavigator extends PureBase {
    static propTypes = {
        children: PropTypes.any
    };

    formatPath(path) {
        if (path) {
            return path.replace(":id", Math.floor(Math.random() * 10));
        }
        return "/404";
    }

    render() {
        return (
            <Layout>
                <Navigator/>
                <div className="flex flex-1 flex-row">
                    <div className="slide-menu">
                        <ul>
                            {routes.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={this.formatPath(item.path)}>{item.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex-1">{this.props.children}</div>
                </div>
            </Layout>
        );
    }
}