import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import axiosInstances from '../../configuration/axios.instance'

export default class extends Base {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.element
		]).isRequired
	};

	static childContextTypes = {
		http: PropTypes.object
	};

	getChildContext() {
		return {
			http: axiosInstances
		};
	}

	render() {
		return React.Children.only(this.props.children);
	}
}