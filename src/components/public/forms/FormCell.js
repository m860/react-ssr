import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'
import classnames from 'classnames'

export default class FormCell extends Base {
	static propTypes = {
		label: PropTypes.string.isRequired,
		message: PropTypes.string
	};

	render() {
		// let props = {...this.props};
		// if (props.onChange) {
		// 	props.onChange = (event)=> {
		// 		this.props.onChange(event);
		// 		if (this.props.validate) {
		// 			this.updateState({
		// 				message: {$set: this.props.validate(event.target.value)}
		// 			});
		// 		}
		// 	}
		// }
		// if (this.state.message) {
		// 	props.className = classnames(props.className, 'has-error')
		// }
		// delete props.validate;
		// delete props.label;
		// delete props.children;
		return (
			<div className='form-cell'>
				<div><label>{this.props.label}</label><span>{this.props.message}</span></div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}