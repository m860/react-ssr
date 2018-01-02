import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import App, {store} from '../src/components/App'
import {showToast} from '../src/ar/toast.ar'

Enzyme.configure({adapter: new Adapter()});

describe(`test Toast`, () => {
	const app = mount(<App/>);
	test('show toast & hide toast after 1 second', async () => {
		store.dispatch(showToast({
			message: 'abc',
			duration: 1000
		}));
		const items = app.find('toast-item');
		expect(items.length === 1);
		setTimeout(() => {
			expect(app.find('toast-item').length === 0);
			return Promise.resolve();
		}, 1000);
	})
})

