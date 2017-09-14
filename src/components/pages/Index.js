import React from 'react'
import BasePage from './BasePage'
import {Link} from "react-router-dom"

export default class Index extends BasePage{
	render(){
		return (
			<div>
				<ul>
					<li>
						<Link to='/pagea'>Page A</Link>
					</li>
					<li>
						<Link to='/pageb'>Page B</Link>
					</li>
				</ul>
			</div>
		);
	}
}