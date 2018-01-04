import React from 'react'
import PropTypes from 'prop-types'
import InputCell from './InputCell'
import InputBase from './InputBase'

export default class Select extends InputBase {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		}))
	};

	static defaultProps = {
		options: []
	};

	render() {
		return (
			<InputCell label={this.props.label} message={this.state.message}>
				<select {...this.inputProps}>
					{this.props.options.map((option, index) => {
						return (
							<option value={option.value} key={index}>{option.text}</option>
						);
					})}
				</select>
			</InputCell>
		);
	}
}