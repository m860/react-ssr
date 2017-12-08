import pythonBridge from 'python-bridge'

const python = pythonBridge();

python.ex`import sqlparse`;

export function helloPython() {
	python.ex`
		def hello():
			return "hello python !!"
	`;
	python`hello()`.then((result) => {
		console.log(result);
	})
}

export async function pickFields(sqlText: String) {
	python.ex`
		def pickParenthesis(sqlText):
			parse = sqlparse.parse(sqlText)
			tokens = parse[0].tokens
			arr = []
			for i, value in enumerate(tokens):
				arr.append({
					"group": value.is_group,
					"keyword": value.is_keyword,
					"whitespace": value.is_whitespace,
					"type": value.ttype,
					"value": value.value
				})
			return arr
	`
	const result = await python`pickParenthesis(${sqlText})`;
	return result;
}