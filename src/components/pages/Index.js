import React from 'react'
import BasePage from './BasePage'
import {Link} from "react-router-dom"
import Layout from '../public/Layout'
import Navigator from '../public/Navigator'

export default class Index extends BasePage {
	render() {
		return (
			<Layout>
				<Navigator/>
				<ul>
					<li>
						<Link to='/pagea'>Page A</Link>
					</li>
					<li>
						<Link to='/pageb'>Page B</Link>
					</li>
				</ul>
			</Layout>
		);
	}
}