import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import classnames from 'classnames'

export default class InputCell extends Base {
	static propTypes = {
		label: PropTypes.string,
		message: PropTypes.string
	};

	static defaultProps={
		label:'LABEL'
	};

	render() {
		return (
			<div className='form-cell'>
				<div><label>{this.props.label}</label><span className="validation-message">{this.props.message}</span></div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}