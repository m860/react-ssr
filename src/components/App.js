import React from 'react'
import {
	Route,
	Link
} from 'react-router-dom'
import Async from 'react-component-async-module'

import Index from './pages/Index'
import PageA from './pages/PageA'
export default function () {
	return (
		<div>
			<Route exact path="/" component={Index}/>
			<Route path="/pagea" component={PageA}/>
			<Route path="/pageb" render={()=>(
				<Async modules={[__SERVER__?require('./pages/PageB.js').default: System.import('./pages/PageB.js')]}>
				{PageB=>{
					return <PageB/>
				}}
				</Async>
			)}/>
		</div>
	);
}