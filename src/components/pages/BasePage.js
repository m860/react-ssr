import Base, {PureBase} from '../Base'
import {parse as queryParse} from "query-string"


/**
 * 获取页面的state
 * @return {*}
 * @private
 */
function fetchInitialState() {
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

export default class BasePage extends Base {
    constructor(...args) {
        super(...args);
        this.fetchInitialState = fetchInitialState.bind(this);
    }
}

export class PureBasePage extends PureBase {
    constructor(...args) {
        super(...args);
        this.fetchInitialState = fetchInitialState.bind(this);
    }
}
