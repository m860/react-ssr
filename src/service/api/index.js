import express from 'express'
import sendJSON from '../../libs/middleware/sendJSON'
import configuration from '../../configuration/application-setting.client.json'
import logger, {clientLogger} from '../../libs/logger'
import userRouter from './user'

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

userRouter(api);

export default api;