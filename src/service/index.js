import api from './api'

export default function (expressInstance) {
	expressInstance.use('/api', api);
}