import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Breadcrumbs extends Base {
	static propTypes = {
		...Base.propTypes
	};

	render() {
		return (
			<div
				style={this.props.style}
				className={classnames('breadcrumbs',this.props.className)}></div>
		);
	}
}