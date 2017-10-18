import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Async from 'react-component-async-module'

const routes = [
	<Route exact path="/" component={require('./pages/Index').default}/>,
	<Route exact path="/pagea" component={require('./pages/PageA').default}/>,
	<Route exact path="/test/http" component={require('./pages/TestHttp').default}/>,
	<Route exact path="/test/loading" component={require('./pages/TestLoading').default}/>,
];

export default class Routes extends Component {
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