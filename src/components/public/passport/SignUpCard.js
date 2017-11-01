import React from 'react'
import Base from '../../Base'
import PropTypes from 'prop-types'

export default class SignUpCard extends Base {
	render() {
		return (
			<div className="passport-card passport-card-sign-up">
				<div className="title">Sign Up</div>
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
				<div>
					<button type="button">Sign Up</button>
				</div>
				<div className="tips">
					If you have a account maybe try to <a>Sign In</a>
				</div>
			</div>
		);
	}
}