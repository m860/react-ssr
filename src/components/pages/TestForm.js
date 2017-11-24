import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import TextInput from '../public/forms/TextInput'
import Password from '../public/forms/Password'
import Select from '../public/forms/Select'
import RadioButtons from '../public/forms/RadioButtons'
import CheckBox from '../public/forms/CheckBox'
import CheckboxGroup from '../public/forms/CheckboxGroup'
import File from '../public/forms/File'

export default class TestForm extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			age: 0,
			sex: 1,
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
								validate={event=>{
									const value=event.target.value;
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
							<Password
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
								label="Password"/>
							<Select
								options={[{
									key:-1,
									value:'-- Please Select Age --'
								},{
										key:1,
										value:1
									},{
										key:2,
										value:2
									}]}
								onChange={event=>{

									this.updateState({
										age:{$set:parseFloat(event.target.value)}
									})
								}}
								label="Age"/>
							<RadioButtons
								defaultValue={this.state.sex.toString()}
								options={[{
									key:'1',
									value:'male'
								},{
									key:'2',
									value:'female'
								}]}
								onChange={event=>{
									this.updateState({sex:{$set:parseInt(event.target.value)}})
								}}
								label="Sex"/>
							<CheckboxGroup
								options={[{
									key:'1',
									value:'male'
								},{
									key:'2',
									value:'female'
								}]}
								label="CheckBoxGroup"/>
							<File label="File"/>
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
									label="Text"/>
								<TextInput
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