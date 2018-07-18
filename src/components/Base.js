import React, {PureComponent, Component} from 'react';
import update from 'immutability-helper'
import PropTypes from 'prop-types'

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

class PureBase extends PureComponent {
    constructor(props) {
        super(props);
        this.updateState = updateState.bind(this);
    }
}

class Base extends Component {
    constructor(props) {
        super(props);
        this.updateState = updateState.bind(this);
    }
}

export default function (pure = false) {
    return pure ? PureBase : Base;
}
