var isMobile = require('ismobilejs')
var indexCtrl = {}

indexCtrl.home = async (ctx, next) => {
  const title = 'koa2 title'
  const list = []
  const userAgent = ctx.headers['user-agent']
  var result = {
    title,
    list,
    userAgent,
    isMobile: isMobile(userAgent).any
  }
  console.log(isMobile(ctx.headers['user-agent']).any)

  await ctx.render('index', result)
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
