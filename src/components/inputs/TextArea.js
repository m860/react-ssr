import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import classnames from 'classnames'
import FormCell from './InputCell'
import FormBase from './InputBase'

export default class TextArea extends Base {
	static propTypes = {
		...FormBase.propTypes
	};

	render() {
		return (
			<FormCell label={this.props.label} message={this.state.message}>
				<textarea {...this.inputProps}></textarea>
			</FormCell>
		);
	}
}