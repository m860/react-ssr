import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class extends Base {
	static propTypes = {
		...Base.propTypes
	};

	render() {
		return (
			<nav
				style={this.props.style}
				className={classnames('navigator',this.props.className)}>
				<div className="logo">
					<i className="fa fa-bug fa-2x"></i>
				</div>
				<div className="title">
					<span>React Server Render</span>
				</div>
			</nav>
		);
	}
}