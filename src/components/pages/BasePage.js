import Base from '../Base'
import {parse as queryParse} from "query-string"

export default function (pure = false) {
    const parent = Base(pure);
    return class BasePage extends parent {
        constructor(...args) {
            super(...args);
            this._createState();
        }

        /**
         * 获取页面的state
         * @return {*}
         * @private
         */
        _fetchInitialState() {
            const {search} = this.props.location;
            const query = queryParse(search);
            if (this.constructor.fetchInitialState) {
                const args = {
                    query: query,
                    params: this.props.match.params
                }
                return this.constructor.fetchInitialState(args);
            }
            return null;
        }

        /**
         * 创建页面的state
         * @private
         */
        _createState() {
            let state = {};
            if (typeof __INITIAL_STATE__ !== "undefined") {
                try {
                    state = JSON.parse(__INITIAL_STATE__);
                }
                catch (ex) {
                }
                delete window.__INITIAL_STATE__;
            }
            if (this.props.staticContext && this.props.staticContext.initialState) {
                state = this.props.staticContext.initialState;
            }
            this.state = state;
        }

        componentDidMount() {
            if (this.constructor.fetchInitialState) {
                (async () => {
                    const state = await this._fetchInitialState();
                    this.setState(state);
                })();
            }
        }
    }
}