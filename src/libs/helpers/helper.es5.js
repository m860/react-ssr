/**
 * Created by jean.h.ma on 3/24/17.
 */
var fs = require('fs')

exports.displayEnvironment = function () {
	if (!process.env.NODE_ENV) {
		process.env['NODE_ENV'] = 'development';
	}

	if (process.argv.indexOf('-p') >= 0) {
		process.env['NODE_ENV'] = 'production';
	}

	console.log('==============================');
	console.log('environment:' + process.env['NODE_ENV']);
	console.log('==============================');
}

exports.isProduction = function () {
	return process.env['NODE_ENV'] === 'production';
}

exports.getBundleName = function (filepath) {
	var code = fs.readFileSync(filepath, 'utf8');
	var matches = code.match(/@renderInBrowser\((.*)\)/i);
	if (matches && matches.length > 0) {
		var value=matches[1];
		if(value.indexOf("{")>=0){
			var matches2=value.match(/bundleName\s*:\s*([0-9a-z'"]*),?/i);
			if(matches2 && matches2.length>0){
				return matches2[1].replace(/("|')/g,'');
			}
		}
		else{
			return value.replace(/("|')/g,'');
		}
	}
	else {
		matches = code.match(/bundleName\s*:\s*([0-9a-z'"]*)/i)
		if (matches && matches.length > 0) {
			return matches[1].replace(/("|')/g,'');
		}
	}
	throw new Error("bundleName is not found");
}