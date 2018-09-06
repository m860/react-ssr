import React, {Component} from 'react'
import PropTypes from 'prop-types'
import LayoutWithNavigator from "../common/LayoutWithNavigator"

export default class Index extends Component {
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