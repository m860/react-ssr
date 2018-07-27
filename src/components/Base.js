import React, {PureComponent, Component} from 'react';
import update from 'immutability-helper'

export default function (pure = false) {
    const parent = pure ? PureComponent : Component;
    return class Base extends parent {
        updateState(state: any, callback: ?Function): void | Promise {
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
    }
}
