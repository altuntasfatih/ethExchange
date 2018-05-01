
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { getNetIdString, getEthWallets, getBalance, isInjected, web3, contracts } from './web3Service'
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.filter('uppercase', (key) => {
  return key.toUpperCase()
})

;(async () => {
  try {
    const ethWallets = await getEthWallets()
    const netIdString = await getNetIdString()
    const balance = await getBalance(ethWallets[0])
    var result = {
      'balance': balance,
      'coinbase': ethWallets[0],
      'netIdString': netIdString,
      'isInjected': isInjected,
      'instance': web3
    }
    store.dispatch('createWeb3', result)
    store.dispatch('contractPush', contracts)
  } catch (e) {
    // TODO: Handle error

    console.log(e)
  } finally {
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
})()
