import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'

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
				</LoadingView>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}