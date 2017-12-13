import React from 'react'
import BasePage from './BasePage'
import Layout from '../common/Layout'
import forms from '../forms'

const form = {
	//FormVertical
	vertical: require('./test/FormVertical.test')
};

export default class Form extends BasePage {
	get type() {
		return this.props.match.params.type;
	}

	render() {
		const data = form[this.type];
		console.log(data);
		console.log(forms)
		const Component = forms[data.component];
		return (
			<Layout>
				<Component {...data.props}/>
			</Layout>
		)
	}
}