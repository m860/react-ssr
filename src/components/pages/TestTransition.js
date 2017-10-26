import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../public/LayoutWithNavigator'
import PropTypes from 'prop-types'
import ActivityIndicator from '../public/ActivityIndicator'
import LoadingView from '../public/LoadingView'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from '../../ar/loading.ar'
import {showToast} from '../../ar/toast.ar'
import Transition from 'react-transition-group/Transition'

const timeout = 300;

const defaultStyle = {
	transition: `all ${timeout}ms ease-in-out`,
	opacity: 0
};

const transitionStyles = {
	entering: {
		opacity: 0
	},
	entered: {
		opacity: 1
	},
	exiting: {
		opacity: 1
	},
	exited: {
		opacity: 0
	}
};

export default class TestToast extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			in: true
		};
	}

	render() {
		return (
			<LayoutWithNavigator>
				<div>
					<button type="button" onClick={()=>this.updateState({in:{$set:false}})}>fade in</button>
					<button type="button" onClick={()=>this.updateState({in:{$set:true}})}>fade out</button>
				</div>
				<Transition in={this.state.in} timeout={timeout}>
					{state=> {
						return (
							<div style={{...defaultStyle,...transitionStyles[state]}}>fade animation</div>
						);
					}}
				</Transition>
			</LayoutWithNavigator>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}