import Vue from 'vue'
import App from './App'
import router from './router'
import storeVue from './store/storeVue'

import('./assets/css/app.css')
import ('bootstrap/dist/css/bootstrap.min.css')

Vue.config.productionTip = false

let options = {
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
}
Object.assign(options, storeVue)
let app = new Vue(options)
