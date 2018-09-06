/**
 * Created by jean.h.ma on 17/10/2017.
 */
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import ToastItem from './ToastItem'

@connect(({toast})=> {
	return {
		messages: toast.messages
	}
})
export default class Toast extends PureComponent {
	static propTypes = {
        style:PropTypes.object,
        className:PropTypes.string
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