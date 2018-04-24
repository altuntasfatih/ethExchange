<template>
  <div>
    <div>{{$store.getters.web3state}}</div>



  </div>
</template>

<script>
import store from "../store/store";
window.mystorage={
  depo:store,
}

export default {

  data: function () {
    return {
      proList:[]
    }
  },
  methods:
    {
    getProductList: function () {

      $store.productRegistry.getPastEvents({
        fromBlock: 0,
        toBlock: 'latest'
      }, (err, event) => {
        let items=[];

        event.forEach(function(element) {
          element=element.returnValues;
          items.push([element.name,element.product,element.owner]);
        });
        that.setState({
          productArray:items
        })
      })

    }
  },
  beforeCreate () {
    // console.log('Nothing gets called before me!')
  },
  mounted: () => {

    let cont=store.getters.getContracts.Registry
    console.log(this.$data.proList)
    cont.getPastEvents({
        fromBlock: 0,
        toBlock: 'latest'
      }, (err, event) => {
        event.forEach(function(element) {
          element=element.returnValues;
          console.log(element)
          //this.$data.proList.push([element.name,element.product,element.owner])
        });

      })
  }


}
</script>

<style scoped>
</style>
