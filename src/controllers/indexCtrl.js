var isMobile = require('ismobilejs')
import httpService from '../services/httpService'
import config from '../config'
import indexMobileCtrl from './indexMobileCtrl'
import indexPcCtrl from './indexPcCtrl'
const faqApiUrl = config.apiUrl
var indexCtrl = {}

indexCtrl.home = async (ctx, next) => {
  const userAgent = ctx.headers['user-agent']
  var mobile = isMobile(userAgent).any
  if (mobile) {
    await indexMobileCtrl.home(ctx, next)
  } else {
    await indexPcCtrl.home(ctx, next)
  }
}

indexCtrl.gameHome = async (ctx, next) => {
  const userAgent = ctx.headers['user-agent']
  var mobile = isMobile(userAgent).any
  if (mobile) {
    await indexMobileCtrl.gameHome(ctx, next)
  } else {
    await indexPcCtrl.gameHome(ctx, next)
  }
}

indexCtrl.gameCategory = async (ctx, next) => {
  const userAgent = ctx.headers['user-agent']
  var mobile = isMobile(userAgent).any
  if (mobile) {
    await indexMobileCtrl.gameCategory(ctx, next)
  } else {
    await indexPcCtrl.gameCategory(ctx, next)
  }
}

indexCtrl.faqDetail = async (ctx, next) => {
  const userAgent = ctx.headers['user-agent']
  var mobile = isMobile(userAgent).any
  if (mobile) {
    await indexMobileCtrl.faqDetail(ctx, next)
  } else {
    await indexPcCtrl.faqDetail(ctx, next)
  }
}

indexCtrl.feedback = async (ctx, next) => {
  const userAgent = ctx.headers['user-agent']
  var mobile = isMobile(userAgent).any
  if (mobile) {
    await indexMobileCtrl.feedback(ctx, next)
  } else {
    await indexPcCtrl.feedback(ctx, next)
  }
}


indexCtrl.faqLike = async (ctx, next) => {
  const id = ctx.params.id
  const url = `${faqApiUrl}/api/open/faq/like`
  var params = {}
  params.id = id
  const resultMap = await httpService.request(ctx, 'POST', url , params)

  ctx.body = resultMap
}

indexCtrl.postFeedback =  async (ctx, next) => {
  const data = ctx.request.body
  var url = `${faqApiUrl}/api/open/faq/userSuggest`
  const resultMap = await httpService.request(ctx, 'POST', url, data)
  ctx.body = resultMap
}
export default indexCtrl
