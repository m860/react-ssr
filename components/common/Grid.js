/**
 * Created by jean.h.ma on 3/29/17.
 */
import React ,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from '../BaseComponent'
import classNames from 'classnames'

export default class Grid extends BaseComponent{
	render(){
		let props=Object.assign({},this.props);
		if(props.className){
			props.className=classNames(props.className,"pure-g")
		}
		else{
			props.className="pure-g";
		}
		return (
			<div {...props}>{this.props.children}</div>
		);
	}
}