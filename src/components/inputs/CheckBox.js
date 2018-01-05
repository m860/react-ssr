import React from 'react'
import PropTypes from 'prop-types'
import InputCell from './InputCell'
import InputBase from './InputBase'

export default class CheckBox extends InputBase {
	static propTypes = {
		...InputBase.propTypes
	};
	render() {
		return (
			<InputCell label={this.props.label} message={this.state.message}>
				<input {...this.inputProps} type="checkbox"/>
			</InputCell>
		);
	}
}