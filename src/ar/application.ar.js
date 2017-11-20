import {api} from '../configuration/axios.instance'
import update from 'immutability-helper'
import equal from 'fast-deep-equal'

const initialState = {
	setting: null
};

const FETCH_APPLICATION_SETTING = Symbol();
export function fetchApplicationSetting() {
	return async function (dispatch, getState) {
		const {data} = await api.get('/configuration');
		if (data.success) {
			const {setting}=getState();
			if (!equal(setting, data.data)) {
				dispatch({
					type: FETCH_APPLICATION_SETTING,
					payload: data.data
				});
			}
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