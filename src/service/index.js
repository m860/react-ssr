import api from './api/index'

export default function (expressInstance) {
	expressInstance.use('/api', api);
}