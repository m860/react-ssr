/**
 * Created by jean.h.ma on 17/10/2017.
 */
import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import ActivityIndicator from './ActivityIndicator'
import Loading from './Loading'
import Transition from 'react-transition-group/Transition'
import update from 'immutability-helper'


const transitionStyles = {
	entering: {
		transform: 'translateX(100%)'
	},
	entered: {
		transform: 'translateX(0)'
	},
	exiting: {
		transform: 'translateX(0)'
	},
	exited: {
		transform: 'translateX(100%)'
	}
};

export default class ToastItem extends Base {
	static propTypes = {
		...Base.propTypes,
		type: PropTypes.oneOf(['info', 'warn', 'error']),
		message: PropTypes.string.isRequired,
		timeout: PropTypes.number.isRequired,
		duration: PropTypes.number.isRequired
	};

	static defaultProps = {
		type: "info"
	};

	constructor(props) {
		super(props);
		this.timer = null;
		this.state = {
			in: false
		}
	}

	render() {
		let iconClassName = "fa-info-circle";
		if (this.props.type === 'warn'
			|| this.props.type === 'error') {
			iconClassName = 'fa-exclamation-circle'
		}
		console.log(this.props)
		return (
			<Transition
				in={this.state.in}
				timeout={this.props.timeout}>
				{(state)=> {
					let style = {
						transition: `all ${this.props.timeout}ms ease-in-out`,
						...transitionStyles[state]
					};
					if (this.props.style) {
						style = update(style, this.props.style);
					}
					return (
						<div
							style={style}
							className={classnames('toast-item',`toast-item-${this.props.type}`,this.props.className)}>
							<div>
								<i className={classnames('fa',iconClassName)}></i><span>{this.props.message}</span>
							</div>
						</div>
					);
				}}
			</Transition>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		this.updateState({
			in: {$set: true}
		}, ()=> {
			this.timer = setTimeout(()=> {
				this.updateState({
					in: {$set: false}
				});
			}, this.props.duration - this.props.timeout * 2);
		});
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}
}