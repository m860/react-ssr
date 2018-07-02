import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import FormCell from './InputCell'
import uuid from "uuid/v1"

export default class RadioButtons extends Base {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string
        })).isRequired,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.name = uuid();
        this.state = {
            checkedValue: props.defaultValue
        };
    }

    render() {
        let props = Object.assign({}, this.props);
        delete props.options;
        delete props.defaultValue;
        delete props.onChange;
        return (
            <FormCell {...props}>
                <div className="radio-buttons">
                    {this.props.options.map((option, index) => {
                        return (
                            <div key={index}>
                                <label>{option.value}</label>
                                <input
                                    type="radio"
                                    onChange={(event) => {
                                        if (this.props.onChange) {
                                            this.props.onChange(event);
                                        }
                                        this.updateState({
                                            checkedValue: {$set: event.target.value}
                                        });
                                    }}
                                    checked={option.key === this.state.checkedValue}
                                    name={this.name}
                                    value={option.key}/>
                            </div>
                        );
                    })}
                </div>
            </FormCell>
        );
    }
}