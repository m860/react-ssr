import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/components/App'

Enzyme.configure({adapter: new Adapter()});

describe(`test Toast`, () => {
	const app = mount(<App/>);
	test('store is ready', () => {
		expect(app.state.storeIsReady);
	})
})

