import React from 'react'
import BasePage from './BasePage'
import PropTypes from 'prop-types'
import LayoutWithNavigator from "../common/LayoutWithNavigator"

export default class Index extends BasePage {
    static contextTypes = {
        setting: PropTypes.any
    };

    render() {
        return (
            <LayoutWithNavigator>
            </LayoutWithNavigator>
        );
    }
}