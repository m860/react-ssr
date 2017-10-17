import React from 'react'
import BasePage from './BasePage'
import {Link} from "react-router-dom"
import Layout from '../public/Layout'
import Navigator from '../public/Navigator'
import PropTypes from 'prop-types'
import {RoutePaths} from '../Routes'

export default class extends BasePage {
	render() {
		return (
			<Layout>
				<Navigator/>
				<ul>
					{RoutePaths.map((path,index)=>{
						return (
							<li key={`path-${index}`}>
								<Link to={path}>{path}</Link>
							</li>
						);
					})}
				</ul>
			</Layout>
		);
	}
}