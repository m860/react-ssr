import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class DataWrapper extends Base {
	static propTypes = {
		data: PropTypes.any
	};
	static childContextTypes = {
		data: PropTypes.any
	};


	getChildContext() {
		return {
			data: this.props.data
		};
	}

	render() {
		return React.Children.only(this.props.children);
	}
}