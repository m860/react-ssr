import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import SignInCard from '../public/passport/SignInCard'

export default class SignIn extends BasePage {
	render() {
		return (
			<LayoutWithNavigator>
				<div className="flex-center ">
					<SignInCard></SignInCard>
				</div>
			</LayoutWithNavigator>
		);
	}
}