import reducers from "../ar"
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import logger from "./logger"

logger.info(`#store# create store ...`)
const store = createStore(
    reducers,
    {
        application: {
            setting: require('../configuration/application-setting').default
        }
    },
    compose(
        applyMiddleware(thunk)
    )
);

export default store;
