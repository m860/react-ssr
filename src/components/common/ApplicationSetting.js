import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import logger from '../../libs/logger'
import Base,{PureBase} from "../Base"

@connect(({application}) => {
    return {
        setting: application.setting
    }
})
export default class ApplicationSetting extends Base {
    static propTypes = {
        setting: PropTypes.any,
        children: PropTypes.any,
        dispatch: PropTypes.func
    };
    static childContextTypes = {
        setting: PropTypes.any
    };

    getChildContext() {
        return {
            setting: {
                ...this.props.setting
            }
        };
    }

    render() {
        if (!this.props.setting) {
            logger.info('application setting is undefined')
            return null;
        }
        logger.info('application setting is ready')
        return React.Children.only(this.props.children);
    }
}