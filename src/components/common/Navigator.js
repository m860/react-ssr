import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Navigator extends PureComponent {
	static propTypes = {
		style:PropTypes.object,
		className:PropTypes.string
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
					<span>React Server-Side Render</span>
				</div>
			</nav>
		);
	}
}