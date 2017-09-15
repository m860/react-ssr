import React,{PureComponent} from 'react'
import Async from 'react-component-async-module'
import PropTypes from 'prop-types'

export default class AsyncMix extends PureComponent{
	static propTypes={
		...Async.propTypes
	};
	static defaultProps={
		...Async.defaultProps
	};
	constructor(props){
		super(props);

		const a=this.props.modules;
		if(typeof window ==='undefined'){
			console.log('server');
			this._load();

		}
		else{
			console.log('client')
		}
	}
	async _load(){
		const modules=await Promise.all(this.props.modules);
		console.log(modules)
	}
	render(){
		return (
			<Async {...this.props}>{this.props.children}</Async>
		);
	}
}