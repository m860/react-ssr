import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../src/components/inputs/TextInput'
import Password from '../src/components/inputs/Password'
import TextArea from '../src/components/inputs/TextArea'
import Select from '../src/components/inputs/Select'
import CheckBox from '../src/components/inputs/CheckBox'

Enzyme.configure({adapter: new Adapter()});

function inputTest(Component, callback = () => null) {
	const componentName = Component.name;

	function getInput(ele) {
		switch (componentName) {
			case "TextInput":
				return ele.find(`input[type='text']`);
			case "Password":
				return ele.find(`input[type='password']`);
			case "TextArea":
				return ele.find(`textarea`);
			case "Select":
				return ele.find(`select`);
			case "CheckBox":
				return ele.find(`input[type='checkbox']`);
			default:
				return null;
		}
	}

	function getValue(ele) {
		const input = getInput(ele);
		if (input) {
			return input.props().value;
		}
		return null;
	}

	test(`${componentName} : set the props.label`, () => {
		const label = 'name'
		const ele = mount(<Component label={label}/>);
		expect(ele.find('label').text()).toBe(label);
	});
	test(`${componentName} : set the props.value`, () => {
		const defaultValue = 'abc';
		const ele = mount(<Component label="name" value={defaultValue}/>);
		expect(getValue(ele)).toBe(defaultValue);
		const testValue = "1";
		ele.setProps({
			value: testValue
		});
		expect(getValue(ele)).toBe(testValue);
	});
	test(`${componentName} : change event can be trigger`, () => {
		const change = jest.fn();
		const ele = mount(<Component label='name' onChange={change}/>);
		getInput(ele).simulate('change');
		expect(change.mock.calls.length).toBe(1);
	})

	test(`${componentName} : validate event can be trigger before change`, () => {
		const validate = jest.fn();
		const ele = mount(<Component label='name' validate={validate}/>);
		getInput(ele).simulate('change');
		expect(validate.mock.calls.length).toBe(1);
		getInput(ele).simulate('change');
		expect(validate.mock.calls.length).toBe(2);
	})

	test(`${componentName} : show/hide validation message`, () => {
		const rightValue = '123';
		const errorValue = 'abc';
		const errorMessage = 'input is invalid';
		const ele = mount(<Component label='name' validate={({target: {value}}) => {
			if (!/^[0-9]+$/i.test(value)) {
				return errorMessage;
			}
		}}/>);
		getInput(ele).simulate('change', {target: {value: errorValue}});
		expect(ele.find('.validation-message').text()).toBe(errorMessage);
		getInput(ele).simulate('change', {target: {value: rightValue}});
		expect(ele.find('.validation-message').text()).toBe('');
	});

	callback();
}

describe(`test all inputs`, () => {
	inputTest(TextInput);
	inputTest(Password);
	inputTest(TextArea);
	inputTest(Select, () => {
		test(`Select : contains two option elements, all the values are correct`, () => {
			const options = [{
				text: '1',
				value: '1'
			}, {
				text: '2',
				value: '2'
			}];
			const ele = mount(<Select label='name' options={options}/>);
			expect(ele.find('option').length).toBe(2);
			const optionTags = ele.find('option');
			optionTags.forEach((option, index) => {
				expect(option.props().value).toBe(options[index].value);
				expect(option.text()).toBe(options[index].text);
			})
		});
	});
	inputTest(CheckBox);
});
