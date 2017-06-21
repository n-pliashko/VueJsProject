import Vue from 'vue'
import App from './App'
import router from './router'

import('./assets/css/app.css')
import ('bootstrap/dist/css/bootstrap.min.css')

Vue.config.productionTip = false

let app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  data () {
    return {
      items: [],
      pagination: {
        skip: 0,
        limit: 60
      },
      total: 0
    }
  }
})


document.addEventListener('DOMContentLoaded', function () {
  app.$mount('#app')
})
