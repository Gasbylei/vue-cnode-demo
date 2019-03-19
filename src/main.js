import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './filters'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './components'
import Message from './plugins/message'

Vue.config.productionTip = false
Vue.use(NProgress)
Vue.prototype.axios = axios
Vue.use(VueAxios,axios)
Vue.use(Message)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
