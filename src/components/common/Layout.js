/**
 * Created by jean.h.ma on 17/10/2017.
 */
import React from 'react'
import Base,{PureBase} from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import ActivityIndicator from './ActivityIndicator'
import Loading from './Loading'

@connect(({loading})=> {
	return {
		visible: loading.counter > 0
	}
})
export default class Layout extends PureBase {
	static propTypes = {
		...Base.propTypes
	};

	render() {
		return (
			<div
				style={this.props.style}
				className={classnames('layout',this.props.className)}>
				{this.props.children}
				<Loading visible={this.props.visible}/>
			</div>
		);
	}
}