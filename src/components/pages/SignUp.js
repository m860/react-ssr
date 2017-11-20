import React from 'react'
import BasePage from './BasePage'
import Layout from '../public/Layout'
import SignUpCard from '../public/passport/SignUpCard'

export default class SignUp extends BasePage {
	render() {
		return (
			<Layout>
				<div className="flex-center ">
					<SignUpCard></SignUpCard>
				</div>
			</Layout>
		);
	}
}