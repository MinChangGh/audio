// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import echart from 'echarts'
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.scss'
import 'babel-polyfill'
import common from './utils/common'

// import '@/utils/element'

Vue.use(common)

Vue.prototype.$echarts = echart
Vue.use(ElementUI, {size: 'small', zIndex: 3000})
Vue.config.productionTip = false
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   // next()
//   // 登录验证
// })
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
