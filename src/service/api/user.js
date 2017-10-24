import express from 'express'
export default function (experssInstance) {
	const router = express.Router();
	router.get('/', (req, res)=> {
		res.success([{
			name: 'jean',
			age: 1
		}]);
	});
	experssInstance.use('/user', router);
}