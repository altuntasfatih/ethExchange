import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null
    },
    contractInstances: null
  },
  strict: true, // don't leave it true on production
  mutations: {
    CREATEWEB3 (state, result) {
      console.log(result)
      state.web3.balance = (result.balance / 10 ** 18)
      state.web3.coinbase = result.coinbase
      state.web3.networkId = result.networkId
      state.web3.isInjected = result.isInjected
      state.web3.web3Instance = result.instance
    },
    CONTRACTSPUSH (state, result) {
      state.contractInstances = result
    }
  },
  actions: {
    createWeb3 ({ commit }, result) {
      commit('CREATEWEB3', result)
    },
    contractPush ({ commit }, result) {
      commit('CONTRACTSPUSH', result)
    }
  },
  getters: {
    web3state: state => {
      return state.web3
    },
    getContracts: state => {
      return state.contractInstances
    },
    coinBase: state => {
      return state.web3.coinbase
    }
  }
})
