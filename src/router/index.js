import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/js'
    },
    {
      path: '/audio',
      name: 'audio',
      component: () => import('@/view/audio/audio')
    },
    {
      path: '/js',
      name: 'jsonp',
      component: () => import('@/view/jsonp/jsonp')
    },
    {
      path: '/iosUpload',
      name: 'iosUpload',
      component: () => import('@/view/jsonp/iosUpload')
    }
  ]
})
