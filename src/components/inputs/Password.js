import React from 'react'
import PropTypes from 'prop-types'
import InputBase from './InputBase'
import InputCell from './InputCell'

export default class Password extends InputBase {
	static propTypes = {
		...InputBase.propTypes
	};

	render() {
		return (
			<InputCell label={this.props.label} message={this.state.message}>
				<input {...this.inputProps} type="password"/>
			</InputCell>
		);
	}
}