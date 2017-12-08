import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchApplicationSetting} from '../../ar/application.ar'
import PropTypes from 'prop-types'
import logger from '../../libs/logger'

@connect(({application})=> {
	return {
		setting: application.setting
	}
})
export default class ApplicationSetting extends Component {
	static childContextTypes = {
		setting: PropTypes.any
	};

	getChildContext() {
		return {
			setting: {
				...this.props.setting
			}
		};
	}

	render() {
		if (!this.props.setting) {
			logger.info('application setting is undefined')
			return null;
		}
		logger.info('application setting is ready')
		return React.Children.only(this.props.children);
	}

	componentDidMount() {
		this.props.dispatch(fetchApplicationSetting());
	}
}