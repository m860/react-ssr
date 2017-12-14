import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import classnames from 'classnames'

export default class InputBase extends Base {
	static propTypes = {
		label: PropTypes.string.isRequired,
		validate: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			message: null
		};
	}

	get inputProps() {
		let inputProps = Object.assign({}, this.props, {
			className: classnames(this.props.className, (this.state.message && this.state.message !== '') ? 'has-error' : ''),
			onChange: event=> {
				this.props.onChange && this.props.onChange(event);
				if (this.props.validate) {
					const message = this.props.validate(event);
					if (message !== this.state.message) {
						this.updateState({
							message: {$set: message}
						})
					}
				}
			}
		});
		delete inputProps.validate;
		delete inputProps.label;
		return inputProps;
	}
}