import React from "react";
import Base,{PureBase} from '../Base'
import PropTypes from "prop-types";
import Loading from './Loading'

export default class LoadingView extends PureBase {
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
				<Loading visible={this.props.visible}/>
			</div>
		);
	}
}
