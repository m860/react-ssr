import React, {Component, PureComponent} from 'react'
import {Provider} from "react-redux";
import ApplicationSetting from './common/ApplicationSetting'
import Toast from './common/Toast'
import logger from '../libs/logger'
import store from "../libs/store"
import Routes from "./Routes"
import PropTypes from "prop-types"

export default class App extends Component {

    static propTypes = {
        routes: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            storeIsReady: true
        };
    }

    render() {
        if (!this.state.storeIsReady) {
            //TODO show loading for restore store
            logger.info('restoring store data ...');
            return null;
        }
        logger.info('restore store data is completed')
        return (
            <Provider store={store}>
				<span>
					<ApplicationSetting>
                        <Routes routes={this.props.routes}/>
					</ApplicationSetting>
					<Toast/>
				</span>
            </Provider>
        );
    }
}