/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */

const testApi = 'http://192.168.150.117:8080'

const onlineApi = 'http://api.kf.hulai.com/v1'

export default {
  port: 3000,
  db: {
    host: 'localhost',
    database: 'kf-portal',
    username: '',
    password: ''
  },
  apiUrl: testApi,
  onlineApi: onlineApi,
  page: {
    title: '胡莱客服官网',
    keywords: '胡莱客服官网-keywords',
    description: '胡莱客服官网-description',
    version: '?v=0.0.1'
  }
}
