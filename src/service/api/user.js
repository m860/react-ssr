import express from 'express'
export default function (expressInstance) {
	const router = express.Router();
	router.get('/', (req, res)=> {
		res.success([{
			name: 'jean',
			age: 1
		}]);
	});
	expressInstance.use('/user', router);
}