import React, {PureComponent} from 'react'
import LayoutWithNavigator from '../common/LayoutWithNavigator'

export default class Http404 extends PureComponent {
    render() {
        return (
            <LayoutWithNavigator>
                <p>404</p>
            </LayoutWithNavigator>
        );
    }
}