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
  const query = ctx.query
  // 包含查询
  var url = `${faqApiUrl}/api/open/faq/gameHome/${gameId}`
  if (query.q) {
    url = `${faqApiUrl}/api/open/faq/gameHome/${gameId}/${query.q}`
  }
  const resultMap = await httpService.request(ctx, 'get', url)

  var result = {
    page: config.page,
    game: resultMap.game,
    gameList: resultMap.gameList,
    categoryQueryList: resultMap.categoryQueryList
  }
  await ctx.render('pc/gameHome', result)
}

indexCtrl.faqDetail = async (ctx, next) => {
  const id = ctx.params.id
  const url = `${faqApiUrl}/api/open/faq/faqDetail/${id}`
  const resultMap = await httpService.request(ctx, 'get', url)
  const getGameurl = `${faqApiUrl}/api/open/faq/allGame`
  const allGameMap = await httpService.request(ctx, 'GET', getGameurl)
  var result = {
    page: config.page,
    faq: resultMap.faq,
    recommendFaq: resultMap.recommendFaq,
    gameList: allGameMap.data
  }
  if (resultMap.faq.isAllgames != 1){
    if (resultMap.faq.faq_games) {
      result.game = resultMap.faq.faq_games[0]
    }
  } else {
    const game = {}
    game.name = "适用全部"
    game.id = result.gameList[0].id
    result.game = game
  }
  await ctx.render('pc/faqDetail', result)
}

indexCtrl.faqLike = async (ctx, next) => {
  const id = ctx.params.id
  const url = `${faqApiUrl}/api/open/faq/like`
  var params = {}
  params.id = id
  const resultMap = await httpService.request(ctx, 'POST', url , params)

  ctx.body = resultMap
}



indexCtrl.gameCategory = async (ctx, next) => {
  const gameId = ctx.params.gameId
  const categoryId = ctx.params.categoryId
  const url = `${faqApiUrl}/api/open/faq/gameCategory/${gameId}/${categoryId}`


  await ctx.render('pc/game_category', result)
}

indexCtrl.feedback = async (ctx, next) => {
  const faqid = ctx.params.faqid
  var url = `${faqApiUrl}/api/open/faq/allGame`
  const allGameMap = await httpService.request(ctx, 'GET', url)
  url = `${faqApiUrl}/api/open/faq/allCategoryFaq`
  const categoryFaqMap = await httpService.request(ctx, 'GET', url)
  url = `${faqApiUrl}/api/open/faq/${faqid}`
  const faqMap = await httpService.request(ctx, 'GET', url)

  var result = {
    page: config.page,
    categoryFaqList: categoryFaqMap.data,
    gameList: allGameMap.data,
    faq: faqMap.faq
  }

  if (faqMap.faq.isAllgames != 1){
    if (faqMap.faq.faq_games) {
      result.game = faqMap.faq.faq_games[0]
    }
  } else {
    result.game = result.gameList[0]
  }

  await ctx.render('pc/feedback', result)
}


indexCtrl.postFeedback =  async (ctx, next) => {
  const data = ctx.request.body
  var url = `${faqApiUrl}/api/open/faq/userSuggest`
  const resultMap = await httpService.request(ctx, 'POST', url, data)
  ctx.body = resultMap
}
export default indexCtrl
