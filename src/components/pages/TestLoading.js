import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'

@connect()
export default class TestLoading extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false
		};
	}

	render() {
		return (
			<LayoutWithNavigator>
				<LoadingView
					visible={this.state.loadingVisible}>
					<ActivityIndicator/>
					<button
						onClick={()=>{
							this.updateState({
								loadingVisible:{$set:true}
							},()=>{
								setTimeout(()=>{
									this.updateState({
										loadingVisible:{$set:false}
									});
								},1000);
							})
						}}
						type="button">show loading
					</button>
					<button
						onClick={()=>{
							this.props.dispatch(showLoading());
							setTimeout(()=>{
								this.props.dispatch(hideLoading());
							},1000);
						}}
						type="button">show global loading
					</button>
				</LoadingView>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}