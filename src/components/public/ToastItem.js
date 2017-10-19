/**
 * Created by jean.h.ma on 17/10/2017.
 */
import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import ActivityIndicator from './ActivityIndicator'
import Loading from './Loading'

export default class ToastItem extends Base {
	static propTypes = {
		...Base.propTypes,
		type: PropTypes.oneOf(['info', 'warn', 'error']),
		message: PropTypes.string.isRequired
	};

	static defaultProps = {
		type: "info"
	};

	render() {
		let iconClassName = "fa-info-circle";
		if (this.props.type === 'warn'
			|| this.props.type === 'error') {
			iconClassName = 'fa-exclamation-circle'
		}
		return (
			<div
				style={this.props.style}
				className={classnames('toast-item',`toast-item-${this.props.type}`,this.props.className)}>
				<div>
					<i className={classnames('fa',iconClassName)}></i><span>{this.props.message}</span>
				</div>
			</div>
		);
	}
}