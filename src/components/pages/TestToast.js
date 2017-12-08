import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../common/ActivityIndicator'
import LoadingView from '../common/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import {showToast} from '../../ar/toast.ar'

@connect()
export default class TestToast extends BasePage {
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
						this.props.dispatch(showToast('info'))
					}}
					type="button">show info
				</button>
				<button
					onClick={()=>{
						this.props.dispatch(showToast({
							type:'warn',
							message:'warn'
						}))
					}}
					type="button">show warn
				</button>
				<button
					onClick={()=>{
						this.props.dispatch(showToast({
							type:"error",
							message:"error"
						}))
					}}
					type="button">show error
				</button>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}