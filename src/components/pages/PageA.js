import React from 'react'
import BasePage from './BasePage'
import {Link,Route} from "react-router-dom"
import PageA1 from './PageA1'

class PageA extends BasePage{
	render(){
		return (
			<div>
				<Link to="/pagea/1" >Page A1</Link>
				Page A
			</div>
		);
	}
}

export default function(){
	return (
		<span>
			<Route exact path="/pagea" component={PageA}/>
			<Route exact path="/pagea/1" component={PageA1}/>
		</span>
	);
}