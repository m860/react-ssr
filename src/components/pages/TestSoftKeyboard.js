import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import SoftKeyboard from '../common/SoftKeyboard'

export default class TestSoftKeyboard extends BasePage {

	render() {
		return (
			<LayoutWithNavigator>
				<SoftKeyboard>
					<input type="text"/>
				</SoftKeyboard>
			</LayoutWithNavigator>
		);
	}
}