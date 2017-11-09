import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import TextInput from '../public/forms/TextInput'

export default class TestForm extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			errors: []
		};
	}

	pushError(name) {
		const index = this.state.errors.indexOf(name);
		if (index < 0) {
			this.updateState({
				errors: {$push: [name]}
			});
		}
	}

	popError(name) {
		this.updateState({
			errors: {
				$apply: (values)=> {
					return values.filter(f=>f !== name)
				}
			}
		});
	}

	render() {
		return (
			<LayoutWithNavigator>
				<div style={{overflow:"auto"}}>
					<div>
						<form className="form-card">
							<TextInput
								validate={value=>{
								if(!/^.{6,8}$/.test(value)){
									this.pushError('name')
									return 'Please input 6~8 characters for name!'
								}
								this.popError('name');
							}}
								onChange={event=>{
								this.updateState({
									name:{$set:event.target.value}
								})
							}}
								label="Name"/>
							<TextInput
								validate={value=>{
								if(!/^.{6,20}$/.test(value)){
									this.pushError('password')
									return 'Please input 6~20 characters for password!'
								}
								this.popError('password')
							}}
								onChange={event=>{
								this.updateState({
									password:{$set:event.target.value}
								})
							}}
								type="password"
								label="Password"/>
							<div className="buttons">
								<button
									type="button"
									disabled={this.state.errors.length>0}>Submit
								</button>
							</div>
						</form>
						{JSON.stringify(this.state)}
					</div>
					<div>
						<form className="form-vertical">
							<div className="buttons">
								<button type="button">button</button>
							</div>
							<div className="forms">
								<TextInput
									label="UserName"/>
								<TextInput
									type="password"
									label="Password"/>
							</div>
						</form>
					</div>
					<div>
						<form className="form-horizontal">
							<div className="buttons">
								<button type="button">button</button>
							</div>
							<div className="forms">
								<TextInput
									label="UserName"/>
								<TextInput
									type="password"
									label="Password"/>
							</div>
						</form>
					</div>
					<div>
						<form className="form-filter">
							<div className="forms">
								<TextInput
									label="UserName"/>
								<TextInput
									type="password"
									label="Password"/>
							</div>
							<div className="buttons">
								<button type="button">button</button>
							</div>
						</form>
					</div>
					<div>
						<form className="form-flow">
							<div className="buttons">
								<button type="button">button</button>
							</div>
							<div className="forms">
								<TextInput
									label="UserName"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
								<TextInput
									type="password"
									label="Password"/>
							</div>
						</form>
					</div>
				</div>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}