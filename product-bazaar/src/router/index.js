import Vue from 'vue'
import Router from 'vue-router'

import Hello from '../components/Hello.vue'
import Start from '../components/Start.vue'
import ProductList from '../components/ProductList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      components: {
        default: Hello
      }
    },
    {
      path: '/start',
      components: {
        default: Start
      }
    },
    {
      path: '/list',
      components: {
        default: ProductList
      }
    }
  ]
})
