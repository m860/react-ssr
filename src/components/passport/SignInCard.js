import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'

export default class SignInCard extends Base {
	render() {
		return (
			<form className="form-card form-sign-in">
				<div className="title">Sign In</div>
				<TextInput
					label="UserName"/>
				<TextInput
					label="Password" type="password"/>
				<div className="tips">
					Have you forgotten your <a>UserName</a> or <a>Password</a>?
				</div>
				<div>
					<button type="button">Sign In</button>
				</div>
				<div className="tips">
					Do you wish to register for <a>a new account</a>?
				</div>
			</form>
		);
	}
}