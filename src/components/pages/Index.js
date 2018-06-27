import React from 'react'
import BasePage from './BasePage'
import {Link} from "react-router-dom"
import Layout from '../common/Layout'
import Navigator from '../common/Navigator'
import PropTypes from 'prop-types'
import routes from "../../configuration/routes.config"

export default class Index extends BasePage {
    static contextTypes = {
        setting: PropTypes.any
    };

    render() {
        return (
            <Layout>
                <Navigator/>
                <ul>
                    {routes.map((route, index) => {
                        return (
                            <li key={`route-${index}`}>
                                <Link to={route.path || Date.now().toString()}>{route.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </Layout>
        );
    }
}