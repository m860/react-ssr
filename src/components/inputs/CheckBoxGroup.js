import React from 'react'
import PropTypes from 'prop-types'
import InputCell from './InputCell'
import guid from 'guid'
import InputBase from './InputBase'
import equal from 'fast-deep-equal'

export default class CheckBoxGroup extends InputBase {
	static propTypes = {
		...InputBase.propTypes,
		options: PropTypes.arrayOf(PropTypes.shape({
			text: PropTypes.string,
			value: PropTypes.string
		})),
		value: PropTypes.array
	};

	static defaultProps = {
		options: [],
		value: []
	};

	constructor(props) {
		super(props);
		this.name = guid.raw();
		this.state = {
			checkedValue: props.value || []
		};
	}

	_isChecked(value) {
		const index = this.state.checkedValue.indexOf(value);
		return index >= 0;
	}

	_pushValue(value, cb = () => null) {
		if (!this._isChecked(value)) {
			this.updateState({
				checkedValue: {$push: [value]}
			}, cb);
		}
		else {
			cb();
		}
	}

	_popValue(value, cb = () => null) {
		const index = this.state.checkedValue.indexOf(value);
		this.updateState({
			checkedValue: {$splice: [[index, 1]]}
		}, cb);
	}

	render() {
		return (
			<InputCell label={this.props.label} message={this.state.message}>
				<div className="checkbox-group">
					{this.props.options.map((option, index) => {
						return (
							<div key={index}>
								<label>{option.text}</label>
								<input
									type="checkbox"
									onChange={(event) => {
										const checked = event.target.checked;
										const cb = () => {
											event.data = {
												values: [...this.state.checkedValue]
											};
											this.props.onChange && this.props.onChange(event);
										}
										if (checked) {
											//push
											this._pushValue(option.value, cb);
										}
										else {
											//pop
											this._popValue(option.value, cb);
										}
									}}
									checked={this._isChecked(option.value)}
									name={this.name}
									value={option.value}/>
							</div>
						);
					})}
				</div>
			</InputCell>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (!equal(nextProps.value, this.state.checkedValue)) {
			this.updateState({
				checkedValue: {$set: nextProps.value || []}
			});
		}
	}
}