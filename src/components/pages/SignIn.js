import React from 'react'
import BasePage from './BasePage'
import Layout from '../public/Layout'
import SignInCard from '../public/passport/SignInCard'

export default class SignIn extends BasePage {
	render() {
		return (
			<Layout>
				<div className="flex-center ">
					<SignInCard></SignInCard>
				</div>
			</Layout>
		);
	}
}