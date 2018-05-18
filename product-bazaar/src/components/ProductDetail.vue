<template>
  <div class="container">
    <div class="item  col-xs-12 col-lg-12 list-group-item"  track-by="id" >
      <div class="thumbnail">
        <img class="group list-group-image" :src="getImageUrl(item['2'])" alt="" />
        <div class="caption">
          <h4 class="group inner list-group-item-heading">
            {{ item['1'] }}</h4>
          <p class="group inner list-group-item-text">
           Owner: {{item['0']}}</p>
          <p class="group inner list-group-item-text">
            View Count: {{item['3']}}</p>
          <p class="group inner list-group-item-text">
            Status of Product: {{item['5']}}</p>
          <p class="group inner list-group-item-text">
            Create Time: {{createdTime}}</p>
          <p class="group inner list-group-item-text">
            Price: {{getPrice}}</p>
          <p class="group inner list-group-item-text">
            In Sale: {{ item['6'] }}</p>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <p class="lead">
                vievver1</p>
            </div>
            <div class="col-xs-12 col-md-12">
              <button class="btn btn-primary"  v-on:click="lock()">Try to Lock</button>
              <button class="btn btn-primary"  v-bind:disabled="buyAble" v-on:click="showDetails()">Buy product</button>

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
      web3: '',
      price: ''

    }
  },
  computed: {
    createdTime: function () {
      var date = new Date(this.item['4'] * 1000)
      return date.toString()
    },
    buyAble: function () {
      return !(this.item['5'] === '2')
    },
    getPrice: function () {
      if (this.item['5'] === '2') {
        if (this.price === '') { return this.item['7'] + 'mili ether' } else { return this.price + 'mili ether' }
      } else {
        return 'not locked'
      }
    }
  },
  mounted () {
  },
  created () {
    this.c_instance = getProduct(this.$route.params.id)
    this.web3 = store.getters.web3state.web3Instance
    const temp = this.c_instance.methods.generalInfo().call()
    temp.then(function (val) {
      this.item = val
      console.log(val)
    }.bind(this))
  },
  methods: {
    lock: function () {
      const temp = this.c_instance.methods.lockProduct().send(
        {value: this.web3.utils.toWei('0.1', 'ether'), from: store.getters.coinBase, gas: 4700000})
      temp.then(function (value, error) {
        if (error == null) {
          window.alert('Product is locked')
          this.item['4'] = '2'
          this.c_instance.methods.priceInfo().call().then(function (val) {
            this.price = val
            console.log('Price info', val)
          }.bind(this))
        }
      }.bind(this))
    },
    buyProduct: function () {
      const temp = this.c_instance.methods.lockProduct().send(
        {value: this.web3.utils.toWei('0.1', 'ether'), from: store.getters.coinBase, gas: 4700000})
      temp.then(function (value, error) {
        console.log(error)
        console.log(value)
      })
    },
    getImageUrl: function (hash) {
      return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
    }
  }
}
</script>

<style scoped>
</style>
