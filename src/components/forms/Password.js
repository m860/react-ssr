import React from 'react'
import PropTypes from 'prop-types'
import FormBase from './FormBase'
import FormCell from './FormCell'

export default class Password extends FormBase {
	static propTypes = {
		...FormBase.propTypes
	};

	render() {
		return (
			<FormCell label={this.props.label} message={this.state.message}>
				<input {...this.inputProps} type="password"/>
			</FormCell>
		);
	}
}