import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'

export default class extends BasePage {
	static contextTypes = {
		http: PropTypes.object
	};

	render() {
		return (
			<LayoutWithNavigator>
				<button
					onClick={async ()=>{
						const res= await this.context.http.local.get('http://www.baidu.com',{
							withCredentials:true,
							headers:{
								'Content-Type':"application/html"
							}
						});
						console.log(res);
					}}
					type="button">GET baidu.com
				</button>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		console.log(this.context)
	}
}