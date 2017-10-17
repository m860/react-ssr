import React, {PureComponent} from 'react';
import update from 'immutability-helper'
import PropTypes from 'prop-types'

export default class Base extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object
	};

	constructor(props) {
		super(props);
		this._mounted = false;
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	setState2(state: Object, callback: ?Function): void {
		if (this._mounted) {
			this.setState(state, callback);
		}
	}

	updateState(state: Object, callback: ?Function): void {
		const newState = update(this.state, state);
		this.setState2(newState, callback);
	}
}