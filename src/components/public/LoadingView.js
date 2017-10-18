import React from "react";
import Base from '../Base'
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import ActivityIndicator from './ActivityIndicator'

export default class LoadingView extends Base {
	static propTypes = {
		visible: PropTypes.bool
	};
	static defaultProps = {
		visible: false
	};

	render() {
		return (
			<div className="loading-view">
				{this.props.children}
				{this.props.visible &&
				<div className="loading">
					<ActivityIndicator/>
				</div>}
			</div>
		);
	}
}
