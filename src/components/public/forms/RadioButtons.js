import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'
import classnames from 'classnames'
import FormCell from './FormCell'
import guid from 'guid'

export default class RadioButtons extends Base {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string,
			value: PropTypes.string
		})).isRequired,
		onChange: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.name = guid.raw();
	}

	render() {
		let props = Object.assign({}, this.props);
		delete props.options;
		return (
			<FormCell {...props}>
				<div className="radio-buttons">
					{this.props.options.map((option, index)=> {
						return (
							<div key={index}>
								<label>{option.value}</label>
								<input type="radio" name={this.name} value={option.key}/>
							</div>
						);
					})}
				</div>
			</FormCell>
		);
	}
}