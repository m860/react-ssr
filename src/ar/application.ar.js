import http from '../libs/http'
import update from 'immutability-helper'
import equal from 'fast-deep-equal'

const initialState = {
    setting: null
};

const ACTION_APPLICATION_FETCH = Symbol("ACTION_APPLICATION_FETCH");

export function fetchApplicationSetting() {
    return async function (dispatch, getState) {
        const {data} = await http.get('/configuration');
        if (data.success) {
            const {setting} = getState();
            if (!equal(setting, data.data)) {
                dispatch({
                    type: ACTION_APPLICATION_FETCH,
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
        case ACTION_APPLICATION_FETCH:
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