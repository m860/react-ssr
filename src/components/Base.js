import React, {PureComponent, Component} from 'react';
import update from 'immutability-helper'

function updateState(state: any, callback: ?Function): void | Promise {
    if (this.state) {
        const newState = update(this.state, state);
        if (callback) {
            this.setState(newState, callback);
        }
        else {
            return new Promise((resolve) => {
                this.setState(newState, function () {
                    resolve();
                })
            })
        }
    }
}

export class PureBase extends PureComponent{
    constructor(...args){
        super(...args);
        this.updateState=updateState.bind(this);
    }
}

export default class Base extends Component{
    constructor(...args){
        super(...args);
        this.updateState=updateState.bind(this);
    }
}
