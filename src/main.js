// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(VueClipboard)

//引用Croppa图片裁剪
import VueCropper from 'vue-cropper' 

Vue.use(VueCropper)
Vue.use(MintUI)

import Vuex from 'vuex' //引入状态管理
Vue.prototype.$axios = axios
axios.defaults.baseURL = ''
Vue.config.productionTip = false
Vue.use(ElementUI);
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(Vuex) ;
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (localStorage.getItem('ex2')) {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

