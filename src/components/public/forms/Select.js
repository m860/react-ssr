import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'
import classnames from 'classnames'
import FormCell from './FormCell'

export default class Select extends Base {
	render() {
		return (
			<FormCell {...this.props}>
				<select>{this.props.children}</select>
			</FormCell>
		);
	}
}