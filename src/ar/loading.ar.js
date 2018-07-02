import update from 'immutability-helper'

const initialState = {
    counter: 0
};

const ACTION_LOADING_SHOW = Symbol("ACTION_LOADING_SHOW");
const ACTION_LOADING_HIDE = Symbol("ACTION_LOADING_HIDE");

export function showLoading() {
    return {
        type: ACTION_LOADING_SHOW
    };
}

export function hideLoading() {
    return {
        type: ACTION_LOADING_HIDE
    };
}


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_LOADING_SHOW:
            return update(state, {
                counter: {$set: state.counter + 1}
            });
        case ACTION_LOADING_HIDE:
            return update(state, {
                counter: {$set: state.counter - 1}
            });
        default:
            return state;
    }
}