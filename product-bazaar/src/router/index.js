import Vue from 'vue'
import Router from 'vue-router'

import ProductDetail from '@/components/ProductDetail.vue'
import Start from '@/components/Start.vue'
import ProductList from '@/components/ProductList.vue'
import PutProduct from '@/components/PutProduct.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      components: {
        default: ProductList
      }
    },
    {
      name: 'product',
      path: '/product/:id',
      components: {
        default: ProductDetail
      }
    },
    {
      name: 'put',
      path: '/put',
      components: {
        default: PutProduct
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
