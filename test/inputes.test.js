import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../src/components/inputs/TextInput'

Enzyme.configure({adapter: new Adapter()});

describe(`test <TextInput/>`, () => {
	test(`set label`, () => {
		const ti = mount(<TextInput label='name'/>);
		expect(ti.find('label').text() === 'name');
	})
	test(`set default value`, () => {
		const ti = mount(
			<TextInput label='name' defaultValue="abc"/>
		);
		const input = ti.find('input');
		expect(input.props.value === 'abc');
	});
	test(`onChange is working`, () => {
		const change = jest.fn();
		const newValue = '1';
		const ti = mount(
			<TextInput label='name' defaultValue="abc" onChange={({target: {value}}) => {
				change();
				expect(value).toBe(newValue);
			}}/>
		);
		const input = ti.find('input');
		input.simulate('change', {target: {value: newValue}});
		expect(change.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		const change = jest.fn();
		const message = 'please input letter';
		const errorValue = '1';
		const rightValue = 'a';
		const ti = mount(
			<TextInput label='name' defaultValue="abc" onChange={({target: {value}}) => {
				change();
				expect(value).toBe(rightValue);
			}} validate={({target: {value}}) => {
				if (!/^[a-z]+$/i.test(value)) {
					return message;
				}
			}}/>
		);
		const input = ti.find('input');
		input.simulate('change', {target: {value: errorValue}});
		expect(change.mock.calls.length).toBe(0);
		const span = ti.find('.validation-message');
		expect(span.text()).toBe(message);
		input.simulate('change', {target: {value: rightValue}});
		expect(change.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	})
});