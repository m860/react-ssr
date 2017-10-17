import React, {PureComponent} from 'react'
import {Route} from 'react-router-dom'
import Async from 'react-component-async-module'

const routes = [
	<Route exact path="/" component={require('./pages/Index').default}/>,
	<Route exact path="/test/http" component={require('./pages/TestHttp').default}/>
];

let _routePaths = [];

export default class extends PureComponent {
	render() {
		return (
			<span>
				{routes.map((RouteItem, index)=> {
					_routePaths.push(RouteItem.props.path)
					return React.cloneElement(RouteItem, {
						key: `${index}`
					});
				})}
			</span>
		);
	}
}

export const RoutePaths = _routePaths;