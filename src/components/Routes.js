import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Async from 'react-component-async-module'

const routes = [
	<Route exact path="/" component={require('./pages/Index').default}/>,
	<Route exact path="/pagea" component={require('./pages/PageA').default}/>,
	<Route exact path="/test/http" component={require('./pages/TestHttp').default}/>
];

export default class extends Component {
	render() {
		return (
			<span>
				{routes.map((item, index)=> {
					return React.cloneElement(item, {
						key: `route-${index}`
					});
				})}
			</span>
		);
	}
}

export const RoutePaths = (()=> {
	return routes.map(item=> {
		return item.props.path;
	})
})();