import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'

export default class SignUpCard extends Base {
	render() {
		return (
			<form className="form-card form-sign-up">
				<div className="title">Sign Up</div>
				<TextInput label="UserName"/>
				<TextInput label="Password" type="password"/>
				<div style={{marginTop:15}}>
					<button type="button">Sign Up</button>
				</div>
				<div className="tips">
					If you have a account maybe try to <a>Sign In</a>
				</div>
			</form>
		);
	}
}