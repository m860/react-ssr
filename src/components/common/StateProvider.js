import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Base from "../Base"

export default class StateProvider extends Base() {
    static propTypes = {
        state: PropTypes.any,
        children: PropTypes.any
    };
    static childContextTypes = {
        initialState: PropTypes.any
    };


    getChildContext() {
        return {
            initialState: this.props.state
        };
    }

    render() {
        return React.Children.only(this.props.children)
    }
}