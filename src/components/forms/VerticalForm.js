import React from 'react'
import FormBase from './FormBase'
import PropTypes from 'prop-types'
import inputs from '../inputs'

export default class VerticalForm extends FormBase {
	static propTypes = {
		...FormBase.propTypes
	};
	static defaultProps = {
		...FormBase.defaultProps
	};

	render() {
		return (
			<form className={`form form-vertical ${this.props.className}`} style={this.props.style}>
				{this.props.inputs.map((input, index) => {
					const Component = inputs[input.component];
					return <Component key={index} {...(input.props || {})}/>
				})}
			</form>
		);
	}
}