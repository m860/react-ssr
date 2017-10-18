import log4js from 'log4js'

log4js.configure({
	appenders: {
		console: {
			type: "console"
		},
		file: {
			type: 'file',
			filename: 'log.log'
		}
	},
	categories: {
		default: {
			appenders: ['file'],
			level: 'all'
		}
	}
});

export default log4js.getLogger();