import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import Text from '../public/forms/Text'

export default class TestForm extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			hasError: false
		};
	}

	render() {
		return (
			<LayoutWithNavigator>
				<Text
					label="Number"
					validate={(value)=>{
						const result= /^[0-9]{5}$/.test(value);
						if(!result){
							this.updateState({
								hasError:{$set:true}
							})
							return '请填写一个5位数的数字'
						}
						this.updateState({
							hasError:{$set:false}
						})
						return null;
					}}
					onChange={event=>{
						this.updateState({
							value:{$set:event.target.value}
						})
					}}
					defaultValue={this.state.value}/>
				<button
					type="button"
					disabled={this.state.hasError}>Submit{this.state.hasError.toString()}
				</button>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}