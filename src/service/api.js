import express from 'express'
import sendJSON from '../libs/middleware/sendJSON'
import configuration from '../configuration/configuration.client.json'
import logger, {clientLogger} from '../libs/logger'

const api = express();

api.use(sendJSON);

api.get('/configuration', (req, res)=> {
	res.success(configuration);
});

api.post('/clientlogs', (req, res)=> {
	clientLogger.error(req.body.message);
	clientLogger.error(req.body.stack);
	res.end();
});

export default api;