import update from 'immutability-helper'
import guid from 'guid'
import logger from '../libs/logger'
import {ToastType} from "../types/ToastType";
import {ActionType} from "../types/ActionType";
import {NoAction} from "../configuration/consts";

const initialState = {
    messages: []
};

const SHOW_TOAST = Symbol();
const HIDE_TOAST = Symbol();

//@flow
export function showToast(toast: ToastType | String): ActionType {
    if (!toast) {
        return NoAction;
    }
    const id = guid.raw();
    let payload = {id};
    if (toast.constructor.name === "String") {
        payload = Object.assign({
            message: toast,
            timeout: 200,
            duration: 5 * 1000
        }, payload);
    }
    else {
        payload = Object.assign({
            duration: 5 * 1000,
            timeout: 200
        }, payload, toast);
    }
    return function (dispatch) {
        dispatch({
            type: SHOW_TOAST,
            payload: payload
        });
        setTimeout(() => {
            logger.info(`hide toast id=${id}`)
            dispatch({
                type: HIDE_TOAST,
                payload: id
            });
        }, payload.duration);
    }
}


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_TOAST:
            return update(state, {
                messages: {$push: [action.payload]}
            });
        case HIDE_TOAST:
            const index = state.messages.map(f => f.id).indexOf(action.payload);
            if (index >= 0) {
                return update(state, {
                    messages: {$splice: [[index, 1]]}
                });
            }
            return state;
        default:
            return state;
    }
}