/**
 * Created by jean.h.ma on 3/29/17.
 */
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {
	renderInBrowser
} from '../libs/helpers/react.helper'
import BaseComponent from './BaseComponent'
import Header from './common/Header'
import View from './common/View'
import '../src/assets/sass/common.sass'
import Test from './Test'

@renderInBrowser("home")
export default class Home extends BaseComponent {
	render() {
		return (
			<View>
				<Header/>
				<div className="pure-u-1">
					<Test title="Test"/>
				</div>
			</View>
		);
	}
}