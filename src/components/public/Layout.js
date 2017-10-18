/**
 * Created by jean.h.ma on 17/10/2017.
 */
import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Layout extends Base {
	static propTypes = {
		...Base.propTypes
	};

	render() {
		return (
			<div
				style={this.props.style}
				className={classnames('layout',this.props.className)}>
				{this.props.children}
			</div>
		);
	}
}