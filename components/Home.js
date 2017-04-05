/**
 * Created by jean.h.ma on 3/29/17.
 */
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {
	renderInBrowser
} from '../helpers/react.helper'
import BaseComponent from './BaseComponent'
import Header from './common/Header'
import View from './common/View'
import '../assets/sass/common.sass'

@renderInBrowser("home")
export default class Home extends BaseComponent {
	render() {
		return (
			<View>
				<Header/>
				<div className="pure-u-5-5">
					<p>1</p>
					<p>1</p>
				</div>
			</View>
		);
	}
}