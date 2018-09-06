import React, {Component} from 'react'
import LayoutWithNavigator from '../common/LayoutWithNavigator'
import ActivityIndicator from '../common/ActivityIndicator'
import LoadingView from '../common/LoadingView'
import {connect} from 'react-redux'
import {hideLoading, showLoading} from '../../ar/loading.ar'
import PropTypes from "prop-types"

@connect()
export default class Loading extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: false
        };
    }

    render() {
        return (
            <LayoutWithNavigator>
                <LoadingView
                    visible={this.state.loadingVisible}>
                    <ActivityIndicator/>
                    <button
                        onClick={() => {
                            this.setState({
                                loadingVisible: true
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        loadingVisible: false
                                    });
                                }, 1000);
                            })
                        }}
                        type="button">show loading
                    </button>
                    <button
                        onClick={() => {
                            this.props.dispatch(showLoading());
                            setTimeout(() => {
                                this.props.dispatch(hideLoading());
                            }, 1000);
                        }}
                        type="button">show global loading
                    </button>
                </LoadingView>
            </LayoutWithNavigator>
        );
    }
}