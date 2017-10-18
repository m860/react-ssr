import React from 'react'
import Base from '../Base'
import {connect} from 'react-redux'
import {fetchApplicationSetting} from '../../ar/application.ar'
import PropTypes from 'prop-types'

@connect(({application})=> {
	return {
		setting: application.setting
	}
})
export default class extends Base {
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
			console.info('application setting is undefined')
			return null;
		}
		console.info('application setting is ready')
		return React.Children.only(this.props.children);
	}

	componentDidMount() {
		super.componentDidMount();
		this.props.dispatch(fetchApplicationSetting());
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.setting !== nextProps.setting) {
			return true;
		}
		return false;
	}
}