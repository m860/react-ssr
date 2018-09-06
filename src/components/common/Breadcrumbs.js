import React, {PureComponent} from 'react'
import classnames from 'classnames'
import PropTypes from "prop-types"

export default class Breadcrumbs extends PureComponent {
	static propTypes = {
		style:PropTypes.object,
		className:PropTypes.string
	};

	render() {
		return (
			<div
				style={this.props.style}
				className={classnames('breadcrumbs',this.props.className)}></div>
		);
	}
}