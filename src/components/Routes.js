import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Async from 'react-component-async-module'

export const routes = [
	<Route exact path="/" component={require('./pages/Index').default} title="首页"/>,
	<Route exact path="/test/loading" component={require('./pages/TestLoading').default} title="Loading"/>,
	<Route exact path="/test/clientlogs" component={require('./pages/TestClientLog').default} title="日志"/>,
	<Route exact path="/test/toast" component={require('./pages/TestToast').default} title="通知消息"/>,
	<Route exact path="/test/transition" component={require('./pages/TestTransition').default} title="动画测试"/>,
	<Route exact path="/test/fetchdata" component={require('./pages/TestFetchData').default}
		   title="加载remote data"
		   initDataHandler={__SERVER__?require('../initDataHandlers/users').default:!1}/>,
	<Route component={require('./pages/NoMatch').default} title="404"/>
];

export default class Routes extends Component {
	render() {
		return (
			<Switch>
				{routes.map((item, index)=> {
					return React.cloneElement(item, {
						key: `route-${index}`
					});
				})}
			</Switch>
		);
	}
}

export const RoutePaths = (()=> {
	return routes.map(item=> {
		return {
			path: item.props.path,
			title: item.props.title
		};
	})
})();