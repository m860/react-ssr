import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import classnames from 'classnames'
import FormCell from './FormCell'

export default class Select extends Base {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
			value: PropTypes.oneOfType([PropTypes.number,PropTypes.string])
		})).isRequired
	};

	render() {
		let props = Object.assign({}, this.props);
		delete props.options;
		return (
			<FormCell {...props}>
				<select>
					{this.props.options.map((option, index)=> {
						return (
							<option value={option.key} key={index}>{option.value}</option>
						);
					})}
				</select>
			</FormCell>
		);
	}
}