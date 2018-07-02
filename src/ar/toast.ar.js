import update from 'immutability-helper'
import guid from 'guid'
import logger from '../libs/logger'
import {ToastType} from "../types/ToastType";
import {ActionType} from "../types/ActionType";
import {NoAction} from "../configuration/consts";

const initialState = {
    messages: []
};

const ACTION_TOAST_SHOW = Symbol("ACTION_TOAST_SHOW");
const ACTION_TOAST_HIDE = Symbol("ACTION_TOAST_HIDE");

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
            type: ACTION_TOAST_SHOW,
            payload: payload
        });
        setTimeout(() => {
            logger.info(`hide toast id=${id}`)
            dispatch({
                type: ACTION_TOAST_HIDE,
                payload: id
            });
        }, payload.duration);
    }
}


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_TOAST_SHOW:
            return update(state, {
                messages: {$push: [action.payload]}
            });
        case ACTION_TOAST_HIDE:
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