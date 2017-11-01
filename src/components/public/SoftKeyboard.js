/**
 * Created by jean.h.ma on 20/05/2017.
 */
import React from 'react'
import Base from "../Base";
import PropTypes from "prop-types";
import Keyboard, {KeyboardButton, LatinLayout} from "react-screen-keyboard";
import "react-screen-keyboard/src/Keyboard.css";

export default class SoftKeyboard extends Base {
	constructor(props) {
		super(props);
		this.state = {
			activeInput: null
		};
		this.inputs = null;
		this.onFocus = (event)=> {
			this.updateState({
				activeInput: {$set: event.target}
			});
		};
		this.onBlur = ()=> {
		}
	}


	initialInputs() {
		if (!this.inputs) {
			this.inputs = [];
			const {keyboard}=this.refs;
			if (keyboard) {
				keyboard.querySelectorAll('input[type=text],input[type=password]').forEach(input=> {
					this.inputs.push(input);
					input.addEventListener('focus', this.onFocus, false);
					input.addEventListener('blur', this.onBlur, false);
				});
			}

		}
	}

	render() {
		return (
			<span
				ref="keyboard">
				{this.state.activeInput &&
				<Keyboard
					inputNode={this.state.activeInput}
					rightButtons={[
						<KeyboardButton key="closeKeyboard" onClick={()=>{
							this.updateState({
								activeInput:{$set:null}
							})
						}} value="关闭"/>
					]}
					layouts={[LatinLayout]}
				/>}
				{this.props.children}
			</span>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		this.initialInputs();
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		if (this.inputs) {
			this.inputs.forEach(input=> {
				input.removeEventListener('focus', this.onFocus, false);
				input.removeEventListener('blur', this.onBlur, false);
			});
		}
	}
}