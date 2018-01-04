import React from 'react'
import InputCell from './InputCell'
import InputBase from './InputBase'

export default class TextArea extends InputBase {
	static propTypes = {
		...InputBase.propTypes
	};

	render() {
		return (
			<InputCell label={this.props.label} message={this.state.message}>
				<textarea {...this.inputProps}></textarea>
			</InputCell>
		);
	}
}