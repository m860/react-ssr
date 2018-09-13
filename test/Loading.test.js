import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/components/App'
import store from "../src/libs/store"
import {showLoading, hideLoading} from "../src/ar/loading.ar";
import LoadingView from '../src/components/common/LoadingView'

Enzyme.configure({adapter: new Adapter()});

describe(`test Toast`, () => {
    const app = mount(<App/>);
    test('show/hide global loading', () => {
        store.dispatch(showLoading());
        expect(app.find('.loading'));
        store.dispatch(hideLoading());
        expect(!app.find('.loading'))
    });

    test(`show/hide LoadingView`, () => {
        const wrapper = mount(<LoadingView/>);
        wrapper.setProps({
            visible: true
        });
        expect(wrapper.find('.loading').length === 1);
        wrapper.setProps({
            visible: false
        });
        expect(wrapper.find('.loading').length === 0)
    })
})

