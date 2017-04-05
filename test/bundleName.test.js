/**
 * Created by jean.h.ma on 3/28/17.
 */
import {getBundleName} from '../helpers/helper.es5'
import path from 'path'

describe('bundle name', ()=> {

	let case1=path.resolve(__dirname,'./bundleName.case1.js');
	let case2=path.resolve(__dirname,'./bundleName.case2.js');
	let case3=path.resolve(__dirname,'./bundleName.case3.js');
	let case4=path.resolve(__dirname,'./bundleName.case4.js');
	let case5=path.resolve(__dirname,'./bundleName.case5.js');

	test('字符串参数',()=>{
		expect(getBundleName(case1)).toBe("Test")
	});

	test('对象参数-多行单属性',()=>{
		expect(getBundleName(case2)).toBe("Test")
	});

	test('对象参数-多行多属性',()=>{
		expect(getBundleName(case4)).toBe("Test")
	});

	test('对象参数-单行单属性',()=>{
		expect(getBundleName(case3)).toBe("Test")
	});

	test('对象参数-单行多属性',()=>{
		expect(getBundleName(case5)).toBe("Test")
	});

})