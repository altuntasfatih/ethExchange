<template>
<div>
    <div class="well well-sm" align="center">
      <strong class="center">{{web3state}}</strong>
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
  computed: mapGetters(['web3state']),
}
</script>
