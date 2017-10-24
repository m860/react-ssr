let logger;
if (__SERVER__) {
	logger = require('./logger').default;
}
else {
	logger = console;
}
export default logger;