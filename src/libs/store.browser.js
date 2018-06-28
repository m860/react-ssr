import reducers from "../ar"
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

const store = createStore(
    reducers,
    {
        application: {
            setting: require('../configuration/application-setting')
        }
    },
    compose(
        applyMiddleware(thunk)
    )
);

export default store;
