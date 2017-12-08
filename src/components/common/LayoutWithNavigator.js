import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Layout from './Layout'
import Navigator from './Navigator'

export default class LayoutWithNavigator extends Base {
	static propTypes = {
		children: PropTypes.any.isRequired
	};

	render() {
		return (
			<Layout>
				<Navigator/>
				{this.props.children}
			</Layout>
		);
	}
}