import {local} from '../configuration/axios.instance'
import update from 'immutability-helper'

const initialState = {
	setting: null
};

const FETCH_APPLICATION_SETTING = Symbol();
export function fetchApplicationSetting() {
	return async function (dispatch) {
		const {data} = await local.get('/configuration');
		if (data.success) {
			dispatch({
				type: FETCH_APPLICATION_SETTING,
				payload: data.data
			});
		}
		else {
			//TODO show error message
		}
	}
}

export default function (state = initialState, action = {}) {
	switch (action.type) {
		case FETCH_APPLICATION_SETTING:
			if (JSON.stringify(action.payload) !== JSON.stringify(state.setting)) {
				return update(state, {
					setting: {$set: action.payload}
				});
			}
			return state;
		default:
			return state;
	}
}