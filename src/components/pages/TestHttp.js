import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'

export default class extends BasePage {
	static contextTypes = {
		http: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<LayoutWithNavigator>
				<button
					onClick={async ()=>{
						const res= await this.context.http.get('http://www.baidu.com');
						console.log(res);
					}}
					type="button">GET baidu.com
				</button>
			</LayoutWithNavigator>
		);
	}
}