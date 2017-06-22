import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Products from '@/components/Products'

Vue.use(Router)

const router = new Router({
  mode : 'history',
  routes: [
    {
      path: '/products',
      name: 'Product List',
      component: Products
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
});
export default router
