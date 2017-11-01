import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import SignUpCard from '../public/passport/SignUpCard'

export default class SignUp extends BasePage {
	render() {
		return (
			<LayoutWithNavigator>
				<div className="flex-center ">
					<SignUpCard></SignUpCard>
				</div>
			</LayoutWithNavigator>
		);
	}
}