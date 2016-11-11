var isMobile = require('ismobilejs')
import httpService from '../services/httpService'
import config from '../config'
const faqApiUrl = config.apiUrl
var indexCtrl = {}

indexCtrl.home = async (ctx, next) => {
  const title = '胡莱客服官网'
  const list = []
  const userAgent = ctx.headers['user-agent']
  const apiUrl = 'http://api.hulai.com'
  const bannerMap = await httpService.request(ctx, 'POST', apiUrl + '/h/api/index/getBannerList')
  const productMap = await httpService.request(ctx, 'GET', apiUrl + '/h/api/index/getProductOnMark')
  const FriendlyMap = await httpService.request(ctx, 'GET', apiUrl + '/h/api/index/getFriendlyList')

  const url = `${faqApiUrl}/api/open/faq/allGame`
  const allGameMap = await httpService.request(ctx, 'GET', url)

  var result = {
    page: config.page,
    bannerList: bannerMap.bannerList,
    productList: productMap.productList,
    FriendlyList: FriendlyMap.rows,
    gameList: allGameMap.data
  }
  if (result.isMobile) {
    await ctx.render('mobile/index', result)
  } else {
    await ctx.render('pc/index', result)
  }
}

indexCtrl.gameHome = async (ctx, next) => {
  const gameId = ctx.params.gameId
  const url = `${faqApiUrl}/api/open/faq/gameHome/${gameId}`
  const resultMap = await httpService.request(ctx, 'get', url)
  var result = {
    page: config.page,
    game: resultMap.game,
    gameList: resultMap.gameList,
    categoryQueryList: resultMap.categoryQueryList
  }
  await ctx.render('pc/gameHome', result)
}

indexCtrl.gameCategory = async (ctx, next) => {
  const gameId = ctx.params.gameId
  const categoryId = ctx.params.categoryId
  const url = `${faqApiUrl}/api/open/faq/gameCategory/${gameId}/${categoryId}`
  // const result = await httpService.request(ctx, 'get', url)

  console.log(result)

  await ctx.render('pc/game_category', result)
}

export default indexCtrl
