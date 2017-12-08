import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../common/ActivityIndicator'
import LoadingView from '../common/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'

export default class TestClientLog extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false
		};
	}

	render() {
		return (
			<LayoutWithNavigator>
				<button
					onClick={()=>{
						throw new Error('I am a client error');
					}}
					type="button">throw a error (客户端的错误日志会被记录到服务端)
				</button>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}