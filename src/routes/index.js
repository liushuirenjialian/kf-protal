import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'

const router = Router()

// 网站主页
router.get('/', indexCtrl.home)

// 游戏首页
router.get('/:gameId', indexCtrl.gameHome)

// faq 详情
router.get('/detail/:id', indexCtrl.faqDetail)

// 问题反馈
router.get('/feedback/:faqid', indexCtrl.feedback)

// 游戏首页查询, 先用ajax查询吧
// router.get('/:gameId/:query', indexCtrl.gameQuery)

// 游戏分类的首页
router.get('/:gameId/:categoryId', indexCtrl.gameCategory)



// 游戏分类首页的查询，先用ajax查询吧
// router.get('/:gameId/:categoryId/:query', indexCtrl.gameCategoryQuery)


router.post('/post/like/:id', indexCtrl.faqLike)

router.post('/post/feedback', indexCtrl.postFeedback)


export default router
