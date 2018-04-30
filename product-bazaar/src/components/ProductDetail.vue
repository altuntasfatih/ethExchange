<template>
  <div class="container">
    <div class="item  col-xs-12 col-lg-12 list-group-item"  track-by="id" >
      <div class="thumbnail">
        <img class="group list-group-image" src="http://placehold.it/350x250/000/fff" alt="" />
        <div class="caption">
          <h4 class="group inner list-group-item-heading">
            assds</h4>
          <p class="group inner list-group-item-text">
           asdasd</p>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <p class="lead">
                {{this.$route.params.id}}</p>
              <p class="lead">
                {{item}}</p>
              <p class="lead">
                sdad</p>
            </div>
            <div class="col-xs-12 col-md-12">
              <button class="btn btn-success" v-on:click="showDetails(product.address)">Show Details</button>
              <button class="btn btn-success" v-on:click="showDetails(product.address)">Show Details</button>

              <button class="btn btn-success" v-on:click="showDetails(product.address)">Show Details</button>
              <button class="btn btn-success" v-on:click="showDetails(product.address)">Show Details</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import store from '../store/store'
import productJson from '../../../build/contracts/Product.json'

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
      item: ''
    }
  },
  mounted () {
    console.log('in mounted')
  },
  created () {
    this.c_instance = getProduct(this.$route.params.id)
    const temp = this.c_instance.methods.generalInfo().call()
    let that = this
    temp.then(function (val) {
      that.item = val
    })
  }
}
</script>

<style scoped>
</style>
