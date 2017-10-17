import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class extends Base {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.element
		]).isRequired
	};

	static childContextTypes = {
		http: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	getChildContext() {
		return {
			http: axios
		};
	}

	render() {
		return React.Children.only(this.props.children);
	}
}