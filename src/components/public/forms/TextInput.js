import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'
import classnames from 'classnames'

export default class TextInput extends Base {
	static propTypes = {
		validate: PropTypes.func,
		label: PropTypes.string.isRequired
	};
	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = {
			message: null
		};
	}

	render() {
		let props = {...this.props};
		if (props.onChange) {
			props.onChange = (event)=> {
				this.props.onChange(event);
				if (this.props.validate) {
					this.updateState({
						message: {$set: this.props.validate(event.target.value)}
					});
				}
			}
		}
		if (this.state.message) {
			props.className = classnames(props.className, 'has-error')
		}
		delete props.validate;
		delete props.label;
		return (
			<div className='form-cell'>
				<div><label>{this.props.label}</label><span>{this.state.message}</span></div>
				<div>
					<input type="text" {...props}/>
				</div>
			</div>
		);
	}
}