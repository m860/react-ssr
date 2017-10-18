import update from 'immutability-helper'

const initialState = {
	counter: 0
};

const SHOW_LOADING = Symbol();
const HIDE_LOADING = Symbol();

export function showLoading() {
	return {
		type: SHOW_LOADING
	};
}

export function hideLoading() {
	return {
		type: HIDE_LOADING
	};
}


export default function (state = initialState, action = {}) {
	switch (action.type) {
		case SHOW_LOADING:
			return update(state, {
				counter: {$set: state.counter + 1}
			});
		case HIDE_LOADING:
			return update(state, {
				counter: {$set: state.counter - 1}
			});
		default:
			return state;
	}
}