import React from 'react'
import FormBase from './FormBase'
import PropTypes from 'prop-types'

export default class VerticalForm extends FormBase {
	render() {
		return (
			<form className="form form-vertical">
				{this.props.children}
			</form>
		);
	}
}