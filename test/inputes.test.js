import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../src/components/inputs/TextInput'
import Password from '../src/components/inputs/Password'
import TextArea from '../src/components/inputs/TextArea'
import Select from '../src/components/inputs/Select'

Enzyme.configure({adapter: new Adapter()});

describe(`test <TextInput/>`, () => {
	const label = 'name';
	const changeCallback = jest.fn();
	const validateCallback = jest.fn();
	const changeValue = 'newvalue';
	const errorValue = '123';
	const errorMessage = 'Please input some letter!';
	const ele = mount(
		<TextInput label={label}
				   value=""
				   onChange={({target: {value}}) => {
					   changeCallback();
					   expect(value).toBe(changeValue);
				   }}
				   validate={({target: {value}}) => {
					   validateCallback();
					   if (!/^[a-z]+$/i.test(value)) {
						   return errorMessage;
					   }
				   }}/>
	)
	test(`set the props.label`, () => {
		expect(ele.find('label').text()).toBe(label);
		ele.setProps({
			label: 'abc'
		})
		expect(ele.find('label').text()).toBe('abc');
	})
	test(`set the props.value`, () => {
		const value = 'abc';
		ele.setProps({
			value: value
		});
		expect(ele.find('input').props().value).toBe(value);
	});
	test(`onChange and validate event can be trigger`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		const input = ele.find('input');
		input.simulate('change', {target: {value: changeValue}});
		expect(validateCallback.mock.calls.length).toBe(1);
		expect(changeCallback.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		const input = ele.find('input');
		input.simulate('change', {target: {value: errorValue}});
		expect(validateCallback.mock.calls.length).toBe(1);
		expect(changeCallback.mock.calls.length).toBe(0);
		const span = ele.find('.validation-message');
		expect(span.text()).toBe(errorMessage);
		input.simulate('change', {target: {value: changeValue}});
		expect(validateCallback.mock.calls.length).toBe(2);
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	});
});

describe(`test <Password/>`, () => {
	const label = 'name';
	const changeCallback = jest.fn();
	const validateCallback = jest.fn();
	const changeValue = 'newvalue';
	const errorValue = '123';
	const errorMessage = 'Please input some letter!';
	const ele = mount(
		<Password label={label}
				  value=""
				  onChange={({target: {value}}) => {
					  changeCallback();
					  expect(value).toBe(changeValue);
				  }}
				  validate={({target: {value}}) => {
					  validateCallback();
					  if (!/^[a-z]+$/i.test(value)) {
						  return errorMessage;
					  }
				  }}/>
	)
	test(`set the props.label`, () => {
		expect(ele.find('label').text()).toBe(label);
	})
	test(`set the props.value`, () => {
		ele.setProps({
			value: changeValue
		});
		const input = ele.find('input');
		expect(input.props().value).toBe(changeValue);
	});
	test(`onChange and validate event can be trigger`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		const textarea = ele.find('input');
		textarea.simulate('change', {target: {value: changeValue}});
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(validateCallback.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		const textarea = ele.find('input');
		textarea.simulate('change', {target: {value: errorValue}});
		expect(validateCallback.mock.calls.length).toBe(1);
		expect(changeCallback.mock.calls.length).toBe(0);
		const span = ele.find('.validation-message');
		expect(span.text()).toBe(errorMessage);
		textarea.simulate('change', {target: {value: changeValue}});
		expect(validateCallback.mock.calls.length).toBe(2);
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	})
});

describe(`test <TextArea/>`, () => {
	const label = 'name';
	const changeCallback = jest.fn();
	const validateCallback = jest.fn();
	const changeValue = 'newvalue';
	const errorValue = '123';
	const errorMessage = 'Please input some letter!';
	const ele = mount(
		<TextArea label={label}
				  value=""
				  onChange={({target: {value}}) => {
					  changeCallback();
					  expect(value).toBe(changeValue);
				  }}
				  validate={({target: {value}}) => {
					  validateCallback();
					  if (!/^[a-z]+$/i.test(value)) {
						  return errorMessage;
					  }
				  }}/>
	)
	test(`set the props.label`, () => {
		expect(ele.find('label').text()).toBe(label);
	})
	test(`set the props.value`, () => {
		ele.setProps({
			value: changeValue
		});
		const input = ele.find('textarea');
		expect(input.props().value).toBe(changeValue);
	});
	test(`onChange and validate event can be trigger`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		const textarea = ele.find('textarea');
		textarea.simulate('change', {target: {value: changeValue}});
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(validateCallback.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		const textarea = ele.find('textarea');
		textarea.simulate('change', {target: {value: errorValue}});
		expect(validateCallback.mock.calls.length).toBe(1);
		expect(changeCallback.mock.calls.length).toBe(0);
		const span = ele.find('.validation-message');
		expect(span.text()).toBe(errorMessage);
		textarea.simulate('change', {target: {value: changeValue}});
		expect(validateCallback.mock.calls.length).toBe(2);
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	})
});

describe(`test <Select/>`, () => {
	const label = 'name';
	const message = 'please select a item'
	const options = [{
		text: "--Please Select--",
		value: "-1"
	}, {
		text: "def",
		value: "1"
	}];
	const changeCallback = jest.fn();
	const validateCallback = jest.fn();
	const ele = mount(<Select label={label}
							  options={options}
							  onChange={changeCallback}
							  validate={({target: {value}}) => {
								  validateCallback();
								  value = parseFloat(value);
								  if (value < 0) {
									  return message
								  }
							  }}/>);
	const select = ele.find('select');
	test(`set the props.label`, () => {
		expect(ele.find('label').text()).toBe(label);
		ele.setProps({
			label: 'abc'
		});
		expect(ele.find('label').text()).toBe('abc');
	})
	test(`select contains two option elements, all the values are correct`, () => {
		expect(ele.find('option').length).toBe(2);
		const optionTags = ele.find('option');
		optionTags.forEach((option, index) => {
			expect(option.props().value).toBe(options[index].value);
			expect(option.text()).toBe(options[index].text);
		})
	});
	test(`onChange and validate events can be trigger`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		select.simulate('change', {target: {value: options[1].value}});
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(validateCallback.mock.calls.length).toBe(1);
	});
	test(`show/hide validation message`, () => {
		changeCallback.mockReset();
		validateCallback.mockReset();
		select.simulate('change', {target: {value: options[0].value}});
		expect(validateCallback.mock.calls.length).toBe(1);
		expect(changeCallback.mock.calls.length).toBe(0);
		const span = ele.find('.validation-message');
		expect(span.text()).toBe(message);
		select.simulate('change', {target: {value: options[1].value}});
		expect(validateCallback.mock.calls.length).toBe(2);
		expect(changeCallback.mock.calls.length).toBe(1);
		expect(span.text()).toBe('');
	});
	// test(`set the props.value`, () => {
	// 	// ele.setProps({
	// 	// 	value: options[1].value
	// 	// });
	// 	// expect(ele.find('select').props().value).toBe(options[1].value);
	// 	changeCallback.mockReset();
	// 	select.simulate('change', {target: {value: options[0].value}});
	// 	expect(changeCallback.mock.calls.length).toBe(0);
	// 	expect(ele.find('select').props().value).toBe(options[0].value);
	// })
});