/**
 * Created by jean.h.ma on 3/23/17.
 */
import {Router} from 'express'
import Test from '../components/Test'

const router = Router();

router.get('/test', (req, res)=> {
	res.renderComponent(Test,{
		title:'abc'
	})
})

export default function (app) {
	app.use(router);
}