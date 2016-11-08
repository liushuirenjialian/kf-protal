var isMobile = require('ismobilejs')
import httpService from '../services/httpService'
var indexCtrl = {}

indexCtrl.home = async (ctx, next) => {
  const title = '胡莱客服官网'
  const list = []
  const userAgent = ctx.headers['user-agent']
  const apiUrl = 'http://api.hulai.com'
  const bannerMap = await httpService.request(ctx, 'POST', apiUrl + '/h/api/index/getBannerList')
  const productMap = await httpService.request(ctx, 'GET', apiUrl + '/h/api/index/getProductOnMark')
  const FriendlyMap = await httpService.request(ctx, 'GET', apiUrl + '/h/api/index/getFriendlyList')

  var result = {
    title,
    list,
    userAgent,
    bannerList: bannerMap.bannerList,
    productList: productMap.productList,
    FriendlyList: FriendlyMap.rows,
    isMobile: isMobile(userAgent).any
  }

  console.log(result.isMobile)

  if (result.isMobile) {
    await ctx.render('mobile/index', result)
  } else {
    await ctx.render('pc/index', result)
  }
}

indexCtrl.edit = async (ctx, next) => {
  const title = 'koa2 edit'
  var result = {
    title,
    layout: 'layouts/layout'
  }
  console.log(result)

  await ctx.render('esConfig_edit', result)
}

export default indexCtrl
