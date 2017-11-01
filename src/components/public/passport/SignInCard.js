import React from 'react'
import Base from '../../Base'
import PropTypes from 'prop-types'

export default class SignInCard extends Base {
	render() {
		return (
			<div className="passport-card">
				<div className="title">Sign In</div>
				<div className="form">
					<div>
						<label>UserName</label>
						<input/>
					</div>
					<div>
						<label>Password</label>
						<input/>
					</div>
				</div>
				<div className="tips">
					Have you forgotten your <a>UserName</a> or <a>Password</a>?
				</div>
				<div>
					<button type="button">SignIn</button>
				</div>
				<div className="tips">
					Do you wish to register for <a>a new account</a>?
				</div>
			</div>
		);
	}
}