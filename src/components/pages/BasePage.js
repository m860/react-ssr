import Base from '../Base'
import {parse as queryParse} from "query-string"

export default function (pure = false) {
    const parent = Base(pure);
    return class BasePage extends parent {
        callFetchInitialState(component) {
            const {search} = this.props.location;
            const query = queryParse(search);
            if (component && component.fetchInitialState) {
                const args = {
                    query: query,
                    params: this.props.match.params
                }
                return component.fetchInitialState(args);
            }
            return null;
        }
    }
}