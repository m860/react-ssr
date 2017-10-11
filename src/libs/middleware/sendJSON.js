export default function (req, res, next) {
	if (res.success) {
		throw new Error('req.success is exists.');
	}
	res.success = (data, message, code = 200)=> {
		res.json({
			success: true,
			data,
			message,
			code
		})
	};
	if (res.error) {
		throw new Error('req.error is exists');
	}
	res.error = (message, code = 1000, data)=> {
		res.json({
			success: false,
			message,
			code,
			data
		})
	}
	next();
}