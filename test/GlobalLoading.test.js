import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import App, {store} from '../src/components/App'
import {showLoading, hideLoading} from "../src/ar/loading.ar";

Enzyme.configure({adapter: new Adapter()});

describe(`test Toast`, () => {
	const app = mount(<App/>);
	test('show/hide global loading', () => {
		store.dispatch(showLoading());
		expect(app.find('.loading'));
		store.dispatch(hideLoading());
		expect(!app.find('.loading'))
	})
})

