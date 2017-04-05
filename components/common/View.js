/**
 * Created by jean.h.ma on 3/29/17.
 */
import React ,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from '../BaseComponent'

export default class View extends BaseComponent{
	render(){
		return (
			<div>{this.props.children}</div>
		);
	}
}