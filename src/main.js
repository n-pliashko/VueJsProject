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
    components: {App}
  })


document.addEventListener('DOMContentLoaded', function () {
  app.$mount('#app')
})
