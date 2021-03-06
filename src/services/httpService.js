var request = require('request')
var httpService = {}

httpService.request = async (ctx, _method, _url, data) => {
  if (!data) {
    data = {}
  }
  data.requestIP = ctx.request.ip
  var _headers = {}
  _headers['user-agent'] = ctx.header['user-agent']
  _headers['cookie'] = ctx.header['cookie']

  var options = {
    method: _method,
    url: _url,
    headers: _headers,
    form: data
  }
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      var cookies = response.headers['set-cookie']
      if (cookies !== undefined) {
        ctx.set('set-cookie', cookies)
      }
      const res = JSON.parse(body)
      if (!error && response.statusCode === 200) {
        resolve(res)
      } else {
        resolve(res)
      }
    })
  })
}

export default httpService
