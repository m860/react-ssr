import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import PropTypes from 'prop-types'

export default class TestFetchData extends BasePage {
    static fetchInitialState = () => {
        return Promise.resolve([{
            name: "abc",
            age: 1
        }, {
            name: "def",
            age: 2
        }])
    }
    static contextTypes = {
        data: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    render() {
        console.log("render TestFetchData")
        console.log(this.state)
        return (
            <LayoutWithNavigator>
                <ul>
                    {this.state.users.map((user, index) => {
                        return <li key={index}>{user.name}:{user.age}</li>
                    })}
                </ul>
            </LayoutWithNavigator>
        );
    }

    async componentDidMount() {
        super.componentDidMount();
        const data = await TestFetchData.fetchInitialState();
        this.updateState({
            users: {$set: data}
        });
    }
}