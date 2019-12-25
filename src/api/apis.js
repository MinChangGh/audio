import service from './request.js'
import qs from 'qs'
// 钉钉code
let api = {
  get (params,url) {
    return new Promise((resolve, reject) => {
      service.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  post (data,url) {
    return new Promise((resolve, reject) => {
      service.post(url, qs.stringify(data)).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}
export {api}
// export function get (params) {
//   return new Promise((resolve, reject) => {
//     service.get('/sys/loginByDingTalk', {
//       params: params
//     }).then(res => {
//       resolve(res.data)
//     }).catch(err => {
//       reject(err.data)
//     })
//   })
// }
// // #######---------------- 登录
// export function login (data) {
//   return new Promise((resolve, reject) => {
//     service.post('/sys/login', qs.stringify(data)).then(res => {
//       resolve(res.data)
//     }).catch(err => {
//       reject(err.data)
//     })
//   })
// }
