import httpService from '../services/httpService'
import config from '../config'
const faqApiUrl = config.apiUrl
var indexPcCtrl = {}

indexPcCtrl.home = async (ctx, next) => {
  const title = '胡莱客服官网'
  const list = []
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
  await ctx.render('pc/index', result)
}

indexPcCtrl.gameHome = async (ctx, next) => {
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

indexPcCtrl.faqDetail = async (ctx, next) => {
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

indexPcCtrl.gameCategory = async (ctx, next) => {
  const gameId = ctx.params.gameId
  const categoryId = ctx.params.categoryId
  const query = ctx.query
  // 包含查询
  var data = {};
  data.page = 0
  data.size = 20
  if (query.p) {
    data.page = query.p
  }
  var url = `${faqApiUrl}/api/open/faq/categoryHome/${gameId}/${categoryId}?page=${data.page}&size=${data.size}&`
  const resultMap = await httpService.request(ctx, 'get', url, data)

  var result = {
    gameId: gameId,
    categoryId: categoryId,
    page: config.page,
    game: resultMap.game,
    categoryFaq: resultMap.categoryFaq,
    gameList: resultMap.gameList,
    categoryQueryList: resultMap.categoryQueryList,
    total: Number(resultMap.total),
    totalPages: Number(resultMap.totalPages),
    page: Number(data.page)
  }
  var pages = [];
  for (var i = 0; i < result.totalPages; i++) {
    pages.push(i);
  }
  result.pages = pages;

  await ctx.render('pc/categoryHome', result)
}

indexPcCtrl.feedback = async (ctx, next) => {
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
export default indexPcCtrl
