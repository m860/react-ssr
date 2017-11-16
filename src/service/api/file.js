import express from 'express'
import multer from 'multer'
import guid from 'guid'
import path from 'path'

const storage = multer.diskStorage({
	destination: `${process.cwd()}/uploads`,
	filename: (req, file, cb)=> {
		const ext = path.extname(file.originalname);
		cb(null, `${guid.raw()}${ext}`);
	}
});

const upload = multer({storage: storage});

export default function (expressInstance) {
	const router = express.Router();
	router.post('/upload', upload.single('files'), (req, res)=> {
		res.success(`/public/file/${req.file.filename}`);
	});
	expressInstance.use('/file', router);
}