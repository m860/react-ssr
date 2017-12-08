import {pickFields, helloPython} from '../src/libs/sqlparse'

describe(`test 'sqlparse'`, () => {
	test(`hello python`, () => {
		helloPython();
	});

	test(`test 'insert into user(name,age) values(@name,@age)'`, async () => {
		const result = await pickFields('insert into user(name,age) values(@name,@age)');
		console.log(result)
	})

	test(`test 'insert into user(name,age) values(@name,@age)'`, async () => {
		const result = await pickFields('insert into user(name,age) values(@name,@age)');
		console.log(result)
	})

})