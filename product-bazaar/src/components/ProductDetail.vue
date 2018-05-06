<template>
  <div class="container">
    <div class="item  col-xs-12 col-lg-10 list-group-item"  track-by="id" >
      <div class="thumbnail">
        <img class="group list-group-image" src="http://placehold.it/350x250/000/fff" alt="" />
        <div class="caption">
          <h4 class="group inner list-group-item-heading">
            {{item['1']}}</h4>
          <p class="group inner list-group-item-text">
           Owner: {{item['0']}}</p>
          <p class="group inner list-group-item-text">
            View Count: {{item['2']}}</p>
          <p class="group inner list-group-item-text">
            Create Time: {{createdTime}}</p>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <p class="lead">
                vievver1</p>
              <p class="lead">
                vievver2</p>
            </div>
            <div class="col-xs-12 col-md-12">
              <button class="btn btn-primary" v-bind:disabled="lockClickable" v-on:click="lock()">Lock Product</button>
              <button class="btn btn-primary" v-on:click="showDetails()">Buy product</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import store from '@/store/store'
import productJson from '../../../build/contracts/Product.json'

window.depo = {
  web3: store
}
let coinbase = store.getters.web3state.coinbase
function getProduct (address) {
  let _web3 = store.getters.web3state.web3Instance
  return new _web3.eth.Contract(productJson.abi, address)
}
export default {
  name: 'ProductDetail',
  data: function () {
    return {
      c_instance: '',
      address: this.$route.params.id,
      item: '',
      web3: ''
    }
  },
  computed: {
    createdTime: function () {
      var date = new Date(this.item['3'] * 1000)
      return date.toString()
    },
    lockClickable: function () {
      return !(this.item['4'] === '1')
    }
  },
  mounted () {
  },
  created () {
    this.c_instance = getProduct(this.$route.params.id)
    this.web3 = store.getters.web3state.web3Instance
  },
  methods: {
    lock: function () {
      console.log('Clicked Lock')
      console.log(store.getters.web3state.web3Instance)
      console.log(coinbase)
      const temp = this.c_instance.methods.lockProduct().send(
        {value: this.web3.utils.toWei('0.1', 'ether'), from: coinbase, gas: 4700000})
      temp.then(function (error, value) {
        console.log(error)
        console.log(value)
      })
    }
  }
}
</script>

<style scoped>
</style>
