/**
 * Created by jean.h.ma on 3/23/17.
 */
import {Router} from 'express'
import Home from '../components/Home'

const router = Router();

router.get('/', (req, res)=> {
	res.renderComponent(Home)
})

export default function (app) {
	app.use(router);
}