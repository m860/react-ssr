import reducers from "../ar"
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

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
