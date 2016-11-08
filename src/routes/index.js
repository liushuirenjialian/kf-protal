import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'

const router = Router()

router.get('/', indexCtrl.home)

export default router
