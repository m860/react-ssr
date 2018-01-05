import raf from '../__mocks__/tempPolyfill'
import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../src/components/inputs/TextInput'
import Password from '../src/components/inputs/Password'
import TextArea from '../src/components/inputs/TextArea'
import Select from '../src/components/inputs/Select'
import CheckBox from '../src/components/inputs/CheckBox'
import CheckBoxGroup from '../src/components/inputs/CheckBoxGroup'

Enzyme.configure({adapter: new Adapter()});

function testSetLabel(Component) {
	test(`set the props.label`, () => {
		const label = 'name'
		const ele = mount(<Component label={label}/>);
		expect(ele.find('label').text()).toBe(label);
	});
}

function testSetValue(Component, inputSelector) {
	test(`set the props.value`, () => {
		const defaultValue = 'abc';
		const ele = mount(<Component label="name" value={defaultValue}/>);
		expect(ele.find(inputSelector).props().value).toBe(defaultValue);
		const testValue = "1";
		ele.setProps({
			value: testValue
		});
		expect(ele.find(inputSelector).props().value).toBe(testValue);
	});
}

function testTriggerOnChange(Component, inputSelector) {
	test(`change event can be trigger`, () => {
		const change = jest.fn();
		const ele = mount(<Component label='name' onChange={change}/>);
		ele.find(inputSelector).simulate('change');
		expect(change.mock.calls.length).toBe(1);
	})
}

function testTriggerValidateBeforeChange(Component, inputSelector) {
	test(`validate event can be trigger before change`, () => {
		const validate = jest.fn();
		const ele = mount(<Component label='name' validate={validate}/>);
		ele.find(inputSelector).simulate('change');
		expect(validate.mock.calls.length).toBe(1);
		ele.find(inputSelector).simulate('change');
		expect(validate.mock.calls.length).toBe(2);
	})
}

function testToggleValidateMessage(Component, inputSelector) {
	test(`show/hide validation message`, () => {
		const rightValue = '123';
		const errorValue = 'abc';
		const errorMessage = 'input is invalid';
		const ele = mount(<Component label='name' validate={({target: {value}}) => {
			if (!/^[0-9]+$/i.test(value)) {
				return errorMessage;
			}
		}}/>);
		ele.find(inputSelector).simulate('change', {target: {value: errorValue}});
		expect(ele.find('.validation-message').text()).toBe(errorMessage);
		ele.find(inputSelector).simulate('change', {target: {value: rightValue}});
		expect(ele.find('.validation-message').text()).toBe('');
	});
}


describe(`test <TextInput/>`, () => {
	const inputSelector = `input[type='text']`;
	testSetLabel(TextInput);
	testSetValue(TextInput, inputSelector);
	testTriggerOnChange(TextInput, inputSelector);
	testTriggerValidateBeforeChange(TextInput, inputSelector);
	testToggleValidateMessage(TextInput, inputSelector);
});

describe(`test <Password/>`, () => {
	const inputSelector = `input[type='password']`;
	testSetLabel(Password);
	testSetValue(Password, inputSelector);
	testTriggerOnChange(Password, inputSelector);
	testTriggerValidateBeforeChange(Password, inputSelector);
	testToggleValidateMessage(Password, inputSelector);
});

describe(`test <TextArea/>`, () => {
	const inputSelector = `textarea`;
	testSetLabel(TextArea);
	testSetValue(TextArea, inputSelector);
	testTriggerOnChange(TextArea, inputSelector);
	testTriggerValidateBeforeChange(TextArea, inputSelector);
	testToggleValidateMessage(TextArea, inputSelector);
});

describe(`test <CheckBox/>`, () => {
	const inputSelector = `input[type='checkbox']`;
	testSetLabel(CheckBox);
	testSetValue(CheckBox, inputSelector);
	testTriggerOnChange(CheckBox, inputSelector);
	testTriggerValidateBeforeChange(CheckBox, inputSelector);
	testToggleValidateMessage(CheckBox, inputSelector);
});

describe(`test <Select>`, () => {
	const inputSelector = `select`;
	testSetLabel(Select);
	testSetValue(Select, inputSelector);
	testTriggerOnChange(Select, inputSelector);
	testTriggerValidateBeforeChange(Select, inputSelector);
	testToggleValidateMessage(Select, inputSelector);
	test(`contains two option elements, all the values are correct`, () => {
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

describe(`test <CheckBoxGroup/>`, () => {
	const options = [{
		text: '1',
		value: '1'
	}, {
		text: '2',
		value: '2'
	}];
	const defaultValue = ['1']
	testSetLabel(CheckBoxGroup);
	test(`set the props.value`, () => {
		const ele = mount(<CheckBoxGroup label="" options={options} value={defaultValue}/>);
		expect(ele.find('[checked=true]').length).toBe(1);
		expect(ele.find(`input[type='checkbox'][checked=true]`).props().value).toBe(defaultValue[0])
		ele.setProps({
			value: ['2']
		});
		expect(ele.find('[checked=true]').length).toBe(1);
		expect(ele.find(`input[type='checkbox'][checked=true]`).props().value).toBe('2');
		ele.setProps({
			value: ['1', '2']
		});
		expect(ele.find('[checked=true]').length).toBe(2);
		ele.setProps({
			value: null
		});
		expect(ele.find('[checked=true]').length).toBe(0);
	});
	test(`change event can be trigger each checkbox`, () => {
		const change = jest.fn();
		const ele = mount(<CheckBoxGroup label="" options={options} onChange={change}/>);
		ele.find(`input[type='checkbox']`).forEach(el => {
			el.simulate('change',{target:{checked:true}});
		});
		expect(change.mock.calls.length).toBe(2);
	});

	test(`get values on change`, () => {
		const change = jest.fn();
		let selected = [];
		const ele = mount(<CheckBoxGroup label="" options={options} onChange={({data: {values}}) => {
			change();
			selected = values;
		}}/>);
		expect(ele.find('[checked=true]').length).toBe(0);
		const checkbox = ele.find(`input[type='checkbox']`);
		//checked first
		checkbox.first().simulate('change', {target: {checked: true}});
		expect(change.mock.calls.length).toBe(1);
		expect(ele.find('[checked=true]').length).toBe(1);
		expect(selected.length).toBe(1);
		expect(selected[0]).toBe(options[0].value);
		//checked second
		checkbox.last().simulate('change', {target: {checked: true}});
		expect(ele.find('[checked=true]').length).toBe(2);
		expect(selected.length).toBe(2);
		selected.forEach((v, i) => {
			expect(v).toBe(options[i].value);
		});
		//unchecked second
		checkbox.last().simulate('change', {target: {checked: false}});
		expect(ele.find('[checked=true]').length).toBe(1);
		expect(selected.length).toBe(1);
		selected.forEach((v, i) => {
			expect(v).toBe(options[i].value);
		});
	});
})
