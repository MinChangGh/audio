import axios from 'axios'
import storage from '@/utils/storage'
// import env from ''
let base
if (process.env.NODE_ENV === 'development') {
  base = ''
} else {
  base = '/api'
}
const service = axios.create({
  baseURL: base, // api的base_url
  timeout: 3000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

service.interceptors.request.use(config => {

  // config.headers.realName = realName
  return config
}, error => {

  Promise.reject(error)
})

service.interceptors.response.use(res => {
 return Promise.resolve(res)
},
error => {
  return Promise.reject(error)
})

export default service
