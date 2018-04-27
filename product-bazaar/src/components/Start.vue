<template>
  <div>
    <div>{{$store.getters.web3state}}</div>
    <div>{{proList.length}}</div>
  </div>
</template>

<script>
import store from '../store/store'
window.mystorage = {
  depo: store
}

export default {

  data: function () {
    return {
      proList: [],
      name: 'fatih'
    }
  },
  beforeCreate () {
    console.log('Nothing gets called before me!')
  },
  mounted () {
    let _contract = store.getters.getContracts.Registry
    _contract.getPastEvents({ fromBlock: 0, toBlock: 'latest'}, (err, event) => {
      console.log(this.name)
      event.forEach((element) => {
        element = element.returnValues
        console.log(element)
        this.proList.push([element.name, element.product, element.owner])
      })
    })
  }
}
</script>

<style scoped>
</style>
