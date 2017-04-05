/**
 * Created by jean.h.ma on 3/29/17.
 */
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from '../BaseComponent'
import Grid from './Grid'
import '../../assets/sass/Header.sass'

export default class Header extends BaseComponent {
	render() {
		return (
			<Grid className="header">
				<div className="pure-u-2-24">
					<div className="logo">
						<a>AlivePush</a>
					</div>
				</div>
				<div className="pure-u-22-24">
					<div className="nav">
						<div className="pure-menu pure-menu-horizontal">
							<ul className="pure-menu-list">
								<li className="pure-menu-item"><a href="#" className="pure-menu-link">HOME</a></li>
								<li className="pure-menu-item"><a href="#" className="pure-menu-link">API</a></li>
								<li className="pure-menu-item"><a href="#" className="pure-menu-link">ABOUT US</a>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</Grid>

		);
	}
}