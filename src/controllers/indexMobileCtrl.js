var isMobile = require('ismobilejs')
import httpService from '../services/httpService'
import config from '../config'
const faqApiUrl = config.apiUrl
var indexMobileCtrl = {}

indexMobileCtrl.home = async (ctx, next) => {
  const url = `${faqApiUrl}/api/open/faq/allGame`
  const allGameMap = await httpService.request(ctx, 'GET', url)

  var result = {
    page: config.page,
    gameList: allGameMap.data
  }
  await ctx.render('mobile/index', result)
}

indexMobileCtrl.gameHome = async (ctx, next) => {
  const gameId = ctx.params.gameId
  // 包含查询
  var url = `${faqApiUrl}/api/open/faq/gameHome/${gameId}`
  const resultMap = await httpService.request(ctx, 'get', url)

  var result = {
    page: config.page,
    game: resultMap.game,
    gameList: resultMap.gameList,
    categoryQueryList: resultMap.categoryQueryList
  }
  await ctx.render('mobile/gameHome', result)
}

indexMobileCtrl.gameCategory = async (ctx, next) => {
  const gameId = ctx.params.gameId
  const categoryId = ctx.params.categoryId
  const query = ctx.query
  // 包含查询
  var data = {};
  data.page = 0
  data.size = 2000
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

  await ctx.render('mobile/categoryHome', result)
}


indexMobileCtrl.faqDetail = async (ctx, next) => {
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
  await ctx.render('mobile/faqDetail', result)
}


indexMobileCtrl.feedback = async (ctx, next) => {
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

  await ctx.render('mobile/feedback', result)
}

indexMobileCtrl.gameSearch = async (ctx, next) => {
  const gameId = ctx.params.gameId
  const query = ctx.params.search
  var url = `${faqApiUrl}/api/open/faq/gameSearch/${gameId}/${query}`
  console.log(url)
  const resultMap = await httpService.request(ctx, 'GET', url)

  var result = {
    page: config.page,
    game: resultMap.game,
    query: query,
    categoryQueryList: resultMap.categoryQueryList,
    total: Number(resultMap.total),
    totalPages: Number(resultMap.totalPages)
  }

  await ctx.render('mobile/gameSearch', result)
}

export default indexMobileCtrl
