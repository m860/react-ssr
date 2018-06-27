import "normalize-css/normalize.css";
import "font-awesome/css/font-awesome.css";
import '../assets/sass/App.sass'
import React from 'react'
import {Provider} from "react-redux";
import ApplicationSetting from './common/ApplicationSetting'
import Toast from './common/Toast'
import logger from '../libs/logger'
import store from "../libs/store"
import PropTypes from "prop-types"

export default class App extends React.Component {
    static propTypes = {
        children: PropTypes.any
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
                        {this.props.children}
					</ApplicationSetting>
					<Toast/>
				</span>
            </Provider>
        );
    }
}