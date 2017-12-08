import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../common/LayoutWithNavigator'

export default class NoMatch extends BasePage {
	render() {
		return (
			<LayoutWithNavigator>
				<p>404</p>
			</LayoutWithNavigator>
		);
	}
}