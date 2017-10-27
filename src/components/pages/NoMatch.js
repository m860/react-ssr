import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'

export default class NoMatch extends BasePage {
	render() {
		return (
			<LayoutWithNavigator>
				<p>404后面用box2d做个效果</p>
			</LayoutWithNavigator>
		);
	}
}