export default async (ctx, next) => {
  const title = 'koa2-template'
  const list = ['a', 'b', 'c', 'd']
  const resultData = {
    title,
    list: list
  }

  await ctx.render('index', resultData)
}
