import log4js from 'log4js'
import df from 'dateformat'

log4js.configure({
	appenders: {
		console: {
			type: "console"
		},
		server: {
			type: 'file',
			filename: `logs/${df(new Date(), 'yyyy-mm-dd')}.server.log`,
			maxLogSize: 1024 * 1024
		},
		client: {
			type: 'file',
			filename: `logs/${df(new Date(), 'yyyy-mm-dd')}.client.log`,
			maxLogSize: 1024 * 1024
		}
	},
	categories: {
		default: {
			appenders: ['console'],
			level: 'all'
		},
		client: {
			appenders: ['client'],
			level: 'all'
		}
	}
});

export default log4js.getLogger();

export const clientLogger = (()=> {
	let logger = log4js.getLogger('client');
	return logger;
})();