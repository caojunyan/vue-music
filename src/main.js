import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick'
fastclick.attach(document.body)
import './common/stylus/index.styl'
Vue.config.productionTip = false
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:require('./common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
