import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import axios from 'axios'
import App from './App.vue'
import promise from 'es6-promise'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import format from 'date-fns/format'
import session from './utils/session'

Vue.config.productionTip = false
promise.polyfill()
Vue.use(VueRouter)

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/**
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
class DonMessage {
  success (options, single = true) {
    this[showMessage]('success', options, single)
  }

  warning (options, single = true) {
    this[showMessage]('warning', options, single)
  }

  info (options, single = true) {
    this[showMessage]('info', options, single)
  }

  error (options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage] (type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}
Vue.use(ElementUI)
Vue.prototype.$message = new DonMessage()
Vue.prototype.$moment = format
Vue.prototype.$session = session

const router = new VueRouter({
  routes
})
// 判断是否登录
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

console.log('当前环境变量---', process.env.NODE_ENV, process.env.VUE_APP_URL)
const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 响应拦截（配置请求回来的信息）
axios.defaults.timeout = 50000
axios.interceptors.response.use(function (response) {
  // Vue.prototype.$loading = false
  return response.data
}, function (error) {
  // 处理响应失败
  if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    vm.$message.error('网络超时，请联系管理员!')
    return Promise.reject(error) // reject这个错误信息
  } else {
  // 处理响应数据
  // 401 : token错误、过期
  // 402: 无权限
  // 500 ： 服务错误
  switch (error.response.status) {
    case 500:
      vm.$message.error('服务端错误，请联系管理员！')
    break
    case 403:
      vm.$router.push('/login')
      sessionStorage.clear()
    break
    default:
      break
  }
    vm.$message.error(error.response.data.message)
  }
  return Promise.reject(error)
})
Vue.use(vm)
