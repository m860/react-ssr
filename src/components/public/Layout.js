/**
 * Created by jean.h.ma on 17/10/2017.
 */
import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import ActivityIndicator from './ActivityIndicator'

@connect(({loading})=> {
	return {
		visible: loading.counter > 0
	}
})
export default class Layout extends Base {
	static propTypes = {
		...Base.propTypes
	};

	render() {
		return (
			<div
				style={this.props.style}
				className={classnames('layout',this.props.className)}>
				{this.props.children}
				{this.props.visible &&
				<div className="loading">
					<ActivityIndicator/>
				</div>}
			</div>
		);
	}
}