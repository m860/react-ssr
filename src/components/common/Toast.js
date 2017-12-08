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
import ToastItem from './ToastItem'

@connect(({toast})=> {
	return {
		messages: toast.messages
	}
})
export default class Toast extends Base {
	static propTypes = {
		...Base.propTypes
	};

	render() {
		return (
			<div
				style={this.props.style}
				className={classnames('toast',this.props.className)}>
				{this.props.messages.map((message, index)=> {
					return (
						<ToastItem {...message} key={index}/>
					);
				})}
			</div>
		);
	}
}