import React from "react";
import Base from '../Base'
import PropTypes from "prop-types";
import ActivityIndicator from './ActivityIndicator'

export default class Loading extends Base {
	static propTypes = {
		visible: PropTypes.bool
	};
	static defaultProps = {
		visible: false
	};

	render() {
		if (!this.props.visible) {
			return null;
		}
		return (
			<div className="loading">
				<ActivityIndicator/>
			</div>
		);
	}
}