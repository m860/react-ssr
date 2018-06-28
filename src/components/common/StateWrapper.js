import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class StateWrapper extends Component {
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