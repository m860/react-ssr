import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../common/ActivityIndicator'
import LoadingView from '../common/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import {showToast} from '../../ar/toast.ar'
import {api} from '../../configuration/axios.instance'

@connect()
export default class TestFetchData extends BasePage {
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