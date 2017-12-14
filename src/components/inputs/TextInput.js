import React from 'react'
import PropTypes from 'prop-types'
import InputBase from './InputBase'
import FormCell from './InputCell'

export default class TextInput extends InputBase {
	static propTypes = {
		...InputBase.propTypes
	};

	render() {
		return (
			<FormCell label={this.props.label} message={this.state.message}>
				<input {...this.inputProps} type="text"/>
			</FormCell>
		);
	}
}