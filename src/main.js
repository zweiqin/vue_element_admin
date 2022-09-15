import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import showOne from '@/views/my-test/test2/Oneone.js'
// import One from '@/views/test2/Oneone.vue'
// console.log(One)

// import './assets/download/font_3521085_96hawzjtqn4/iconfont.css'
import './styles/icon-class.css'
import './assets/download/font_3521085_96hawzjtqn4/iconfont.js'

// import compute from './utils/extra/bc'
// console.log(compute) //报错
// var compute1 = compute //这个方法不行。就算这样定义，也不能在页面中使用
// window.compute = compute
// Vue.prototype.$compute = compute

import BC from './utils/extra/index'
Vue.use(BC)

import MyPlugin from './utils/extra/myplugin' //这里导入的是自己定义的插件
Vue.use(MyPlugin)
const myplugin = new MyPlugin(['nameA', 'nameB'])

// import 'bootstrap/dist/css/bootstrap.css'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// Vue.component("One", One)
Vue.prototype.showOne = showOne
// console.log(showOne)

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  myplugin,
  router,
  store,
  i18n,
  render: (h) => h(App)
})
