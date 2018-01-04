import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../src/components/inputs/TextInput'
import TextArea from '../src/components/inputs/TextArea'
import Select from '../src/components/inputs/Select'

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

describe(`test <TextArea/>`, () => {
	test(`set label`, () => {
		const ti = mount(<TextArea label='name'/>);
		expect(ti.find('label').text() === 'name');
	})
	test(`set default value`, () => {
		const ti = mount(
			<TextArea label='name' defaultValue="abc"/>
		);
		const input = ti.find('input');
		expect(input.props.value === 'abc');
	});
	test(`onChange is working`, () => {
		const change = jest.fn();
		const newValue = '1';
		const ti = mount(
			<TextArea label='name' defaultValue="abc" onChange={({target: {value}}) => {
				change();
				expect(value).toBe(newValue);
			}}/>
		);
		const input = ti.find('textarea');
		input.simulate('change', {target: {value: newValue}});
		expect(change.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		const change = jest.fn();
		const message = 'please input letter';
		const errorValue = '1';
		const rightValue = 'a';
		const ti = mount(
			<TextArea label='name' defaultValue="abc" onChange={({target: {value}}) => {
				change();
				expect(value).toBe(rightValue);
			}} validate={({target: {value}}) => {
				if (!/^[a-z]+$/i.test(value)) {
					return message;
				}
			}}/>
		);
		const input = ti.find('textarea');
		input.simulate('change', {target: {value: errorValue}});
		expect(change.mock.calls.length).toBe(0);
		const span = ti.find('.validation-message');
		expect(span.text()).toBe(message);
		input.simulate('change', {target: {value: rightValue}});
		expect(change.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	})
});

describe(`test <Select/>`, () => {
	const message = 'please select a item'
	const options = [{
		text: "--Please Select--",
		value: "-1"
	}, {
		text: "def",
		value: "1"
	}];
	const change = jest.fn();
	const ele = mount(<Select label='name'
							  options={options}
							  onChange={change}
							  validate={({target: {value}}) => {
								  value = parseFloat(value);
								  if (value < 0) {
									  return message
								  }
							  }}/>);
	const select = ele.find('select');
	test(`set label`, () => {
		expect(ele.find('label').text() === 'name');
	})
	test(`set options`, () => {
		expect(ele.find('option').length).toBe(2);
		const firstOption = ele.find('option').first();
		expect(firstOption.props().value).toBe(options[0].value);
		expect(firstOption.text()).toBe(options[0].text);
	});
	test(`onChange is working`, () => {
		change.mockReset();
		select.simulate('change', {target: {value: options[1].value}});
		expect(change.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		change.mockReset();
		select.simulate('change', {target: {value: options[0].value}});
		expect(change.mock.calls.length).toBe(0);
		const span = ele.find('.validation-message');
		expect(span.text()).toBe(message);
		select.simulate('change', {target: {value: options[1].value}});
		expect(change.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	});
	test(`set props.value`, () => {
		ele.setProps({
			value: options[1].value
		});
		expect(ele.find('select').props().value).toBe(options[1].value)
	})
});