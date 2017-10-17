import React, {PureComponent} from 'react'
import {Route} from 'react-router-dom'
import Async from 'react-component-async-module'

export default class extends PureComponent {
	render() {
		return (
			<span>
				<Route exact path="/" component={require('./pages/index').default}/>
			</span>
		);
	}
}