import http from 'http'
import Koa from 'koa'
import path from 'path'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import config from './config'
import koaNunjucks2 from 'koa-nunjucks2'
import request from 'request'

const app = new Koa()
const bodyparser = Bodyparser()

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: ''
})))

let viewPath = path.join(__dirname, '../views')
let koaNunjucks2Middleware = koaNunjucks2(viewPath, {autoescape: true, watch: true})

app.use(koaNunjucks2Middleware)

// 500 error
koaOnError(app, {
  template: 'views/exception/500.html'
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// var backendURL = config.apiUrl
// app.use('/v1', function (req, res) {
//   var url = backendURL + req.url
//   req.pipe(request(url)).pipe(res)
// })

// response router
app.use(async (ctx, next) => {
  await require('./routes').routes()(ctx, next)
})

// 404
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('exception/404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

const port = parseInt(config.port || '3000')
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(port + ' is already in use')
      process.exit(1)
      break
    case 'uncaughtException':
      // 打印出错误
      console.log(error)
      // 打印出错误的调用栈方便调试
      console.log(error.stack)
      break
    default:
      // 打印出错误
      console.log(error)
      // 打印出错误的调用栈方便调试
      console.log(error.stack)
      break
  }
})
server.on('listening', () => {
  console.log('Listening on port: %d', port)
})

export default app
