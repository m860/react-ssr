import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import '../assets/sass/App.sass'
import React, {Component} from 'react'
import {Provider} from "react-redux";
import ApplicationSetting from './common/ApplicationSetting'
import Toast from './common/Toast'
import logger from '../libs/logger'
import store from "../libs/store"
import PropTypes from "prop-types"
import Routes from "./Routes"

export default class App extends Component {

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
                        <Routes/>
					</ApplicationSetting>
					<Toast/>
				</span>
            </Provider>
        );
    }
}