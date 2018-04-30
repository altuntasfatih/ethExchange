<template>
  <div class="container">
    <div class="well well-sm">
      <strong>Display</strong>
    </div>
    <div id="products" class="row list-group">
      <div class="item  col-xs-12 col-lg-12 list-group-item"  v-for="product in products" track-by="id" v-bind:key="product.address">
        <div class="thumbnail">
          <img class="group list-group-image" src="http://placehold.it/350x250/000/fff" alt="" />
          <div class="caption">
            <h4 class="group inner list-group-item-heading">
              {{product.name}}</h4>
            <p class="group inner list-group-item-text">
              {{    product.owner}}</p>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <p class="lead">
                  {{product.price}}</p>
                <p class="lead">
                  {{product.price}}</p>
              </div>
              <div class="col-xs-12 col-md-12">
                <router-link :to="{ path: '/product/'+ product.address }"><button class="btn btn-success" >Show Details</button></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style >
.glyphicon { margin-right:5px; }
.thumbnail
{
  margin-bottom: 20px;
  padding: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
}

.item.list-group-item
{
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}
.item.list-group-item:nth-of-type(odd):hover,.item.list-group-item:hover
{
  background: #428bca;
}

.item.list-group-item .list-group-image
{
  margin-right: 10px;
}
.item.list-group-item .thumbnail
{
  margin-bottom: 0px;
}
.item.list-group-item .caption
{
  padding: 9px 9px 0px 9px;
}
.item.list-group-item:nth-of-type(odd)
{
  background: #eeeeee;
}

.item.list-group-item:before, .item.list-group-item:after
{
  display: table;
  content: " ";
}

.item.list-group-item img
{
  float: left;
}
.item.list-group-item:after
{
  clear: both;
}
.list-group-item-text
{
  margin: 0 0 10px;
}

</style>
<script>
import store from '@/store/store'
window.mystorage = {
  depo: store
}
export default {
  data: function () {
    return {
      products: [],
      name: 'fatih'
    }
  },
  mounted () {
    let _contract = store.getters.getContracts.Registry
    _contract.getPastEvents({ fromBlock: 0, toBlock: 'latest'}, (err, event) => {
      event.forEach((element) => {
        element = element.returnValues
        this.products.push({'name': element.name, 'owner': element.owner, 'address': element.product, 'price': 10})
      })
    })
  },
  methods: {
    showDetails: function (owner) {
      console.log('owner:->', owner)
    }
  }
}
</script>
