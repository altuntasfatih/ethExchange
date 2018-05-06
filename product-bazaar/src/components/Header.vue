<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">Product-Bazzar</a>
      <b>Balance:{{web3state.balance }} ETH</b>
      <b>Address:{{web3state.coinbase}}</b>
      <b>Network:{{web3state.networkId}}</b>
      <b></b>
    </nav>
    <div class="jumbotron jumbotron-fluid text-center">
      <div class="container-fluid">
        <h1 class="display-4">Product-Bazaar</h1>
        <p class="lead ">This is an product exchange platform based on ethereum smart contracts.</p>
      </div>
    </div>
  </div>
</template>

<style>
.center {
  text-align: center;
  font-size: 18px;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['web3state'])
}
</script>
