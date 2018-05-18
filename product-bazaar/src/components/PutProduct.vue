<template>
  <div>
    <div class="container">
      <form @submit.prevent="createProduct()">
        <div class="form-group">
          <label for="exampleFormControlInput1">Product Name</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="productName" placeholder="Name">
        </div>
        <div class="form-group col-md-4">
          <label for="price">Price in ether</label>
          <input type="number" class="form-control" v-model="price" id="price">
        </div>
        <div class="form-group col-md-4">
          <label for="minPrice">Min Price</label>
          <input type="number" class="form-control" v-model="minPrice" id="minPrice">
        </div>
        <br>
        <div class="form-group col-md-8">
          <input type="file" class="form-control" @change="onFileChanged" />
          <br>
          <button type="button" v-on:click="onUpload"  class="btn btn-success mb-2" >Load image to Ipfs </button>
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Publish Product</button>
      </form>
      <br>
      <br>
    </div>
    <br>
    <br>
    <br>
  </div>

</template>

<script>
import store from '@/store/store'

export default {
  name: 'PutProduct',
  data: function () {
    return {
      productName: '',
      price: null,
      minPrice: null,
      image: null,
      imageHash: null,
      factoryContract: null
    }
  },
  created () {
    this.factoryContract = store.getters.getContracts.Factory
  },
  methods: {
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload () {
      let ipfs = store.getters.getIpfs
      let reader = new window.FileReader()
      reader.onload = function (e) {
        let buffer = Buffer.from(reader.result)
        ipfs.add(buffer, {progress: (prog) => console.log(`received: ${prog}`)})
          .then((response) => {
            this.imageHash = response[0].hash
            console.log(response[0].hash)
          }).catch((err) => {
            console.error(err)
          })
      }.bind(this)
      reader.readAsArrayBuffer(this.image)
    },
    createProduct () {
      console.log('Hash of image', this.imageHash)
      console.log('name of product', this.productName)
      if (this.imageHash != null && this.productName !== '') {
        const temp = this.factoryContract.methods.publishProduct(this.productName, Number(this.minPrice) * (10 ** 3), this.price * (10 ** 3), true, this.imageHash).send({
          value: store.getters.web3state.web3Instance.utils.toWei('0.1', 'ether'),
          from: store.getters.coinBase,
          gas: 4700000
        })
        temp.then(function (value, error) {
          console.log('value: ', value)
        })
      } else {
        alert('Please fill the all fields')
      }
    }
  }
}
</script>

<style scoped>

</style>
