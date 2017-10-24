import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import {showToast} from '../../ar/toast.ar'
import {api} from '../../configuration/axios.instance'
import logger from '../../libs/console'

@connect()
export default class TestFetchData extends BasePage {
	static fetchData = ()=> {
		logger.info('TestFetchData fetchData ...');
		return [{
			name: "abc",
			age: 1000
		}];
	}
	static contextTypes = {
		data: PropTypes.any
	};

	constructor(props, context) {
		super(props);
		this.state = {
			users: context.data ? context.data : []
		};
	}

	async fetchData() {
		const {data}= await api.get('/user');
		if (data.success) {
			this.updateState({
				users: {$set: data.data}
			});
		}
		else {
			this.props.dispatch(showToast(data.message));
		}
	}

	render() {
		return (
			<LayoutWithNavigator>
				<ul>
					{this.state.users.map((user, index)=> {
						return <li key={index}>{user.name}:{user.age}</li>
					})}
				</ul>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		this.fetchData();
	}
}