import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'
import classnames from 'classnames'

export default class FormValidation extends Base {
	static propTypes = {
		type: PropTypes.oneOf(['none', 'warn', 'error']),
		validate: PropTypes.func.isRequired
	};
	static defaultProps = {
		type: 'none'
	};

	render() {
		return (
			<div className={classnames('form-validation',`form-validation-${this.props.type}`)}>
				{this.props.children}
			</div>
		);
	}
}