/**
 * Created by jean.h.ma on 3/29/17.
 */
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from '../BaseComponent'
import Grid from './Grid'
import '../../src/assets/sass/Header.sass'

export default class Header extends BaseComponent {
	render() {
		return (
			<Grid className="header">
				<div className="pure-u-1">
					<div className="logo">
						<a>React Server Example</a>
					</div>
				</div>
			</Grid>

		);
	}
}