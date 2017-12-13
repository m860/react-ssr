import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import classnames from 'classnames'
import FormCell from './InputCell'
import {FileButton} from 'react-component-uploader'

export default class File extends Base {
	render() {
		return (
			<FormCell {...this.props}>
				<FileButton url="/api/file/upload"/>
			</FormCell>
		);
	}
}