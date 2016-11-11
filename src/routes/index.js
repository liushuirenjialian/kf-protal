import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'

const router = Router()

// 网站主页
router.get('/', indexCtrl.home)

// 游戏首页
router.get('/:gameId', indexCtrl.gameHome)

// 游戏首页查询, 先用ajax查询吧
// router.get('/:gameId/:query', indexCtrl.gameQuery)

// 游戏分类的首页
router.get('/:gameId/:categoryId', indexCtrl.gameCategory)

// 游戏分类首页的查询，先用ajax查询吧
// router.get('/:gameId/:categoryId/:query', indexCtrl.gameCategoryQuery)

export default router
