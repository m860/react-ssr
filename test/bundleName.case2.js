/**
 * Created by jean.h.ma on 3/21/17.
 */
import React ,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import '../app/assets/sass/test.sass'
import {
	renderInBrowser
} from '../src/libs/helpers/react.helper'
import BaseComponent from './BaseComponent'

@renderInBrowser({
	bundleName:"Test"
})
export default class Test extends BaseComponent{
	static propTypes={
		title:PropTypes.string.isRequired
	}
	constructor(props){
		super(props)
		this.state={
			items:[]
		};
	}
	render(){
		return (
			<div>
				<h6>{this.props.title}</h6>
				<button onClick={event=>{
					let state=Object.assign({},this.state);
					state.items.push(state.items.length);
					this.setState(state);
				}}>New Item</button>
				<ul>
					{this.state.items.map((item,index)=>{
						return (
							<li key={index}>{item}a</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
