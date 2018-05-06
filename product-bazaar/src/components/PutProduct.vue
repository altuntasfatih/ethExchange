<template>
  <div>
    <div class="container">
      <form @submit.prevent="createActivityButton()">
        <div class="form-group">
          <label for="exampleFormControlInput1">Product Name</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="productname" placeholder="Meeting">
        </div>
        <div class="form-group col-md-2">
          <label for="price">Price</label>
          <input type="number" class="form-control" v-model="price" id="price">
        </div>
        <div class="form-group col-md-2">
          <label for="participantLimit">Min Price</label>
          <input type="number" class="form-control" v-model="participant_limit" id="participantLimit">
        </div>
        <div class="form-group col-md-2">
        <input type="file" class="form-control @change="onFileChanged"/>
        <button @click="onUpload"  class="btn btn-primary mb-2" >Upload!</button>
        </div>
        <button type="submit" class="btn btn-primary mb-2">Create Activity</button>
      </form>
      <div>
        <ul>
          <li>{{this.activity_name}}</li>
          <li>{{this.is_pay_active}}</li>
          <li>{{this.is_active}}</li>
          <li>{{this.price}}</li>
          <li>{{this.participant_limit}}</li>
          <!--<li>{{this.validation_number}}</li>-->
          <li>{{this.pending}}</li>
        </ul>
      </div>
      <!--
      <div>
        <p>CURRENT ACTIVITIES</p>
        <button type="submit" v-on:click="getList()" class="btn btn-primary mb-2">GET LIST</button>
        <button type="submit" v-on:click="clearList()" class="btn btn-primary mb-2">CLEAR LIST</button>
        <button type="submit" v-on:click="refreshList()" class="btn btn-primary mb-2">REFRESH LIST</button>
        <p>{{activity_list}}</p>
      </div>
      -->
    </div>
  </div>

</template>

<script>
export default {
  name: 'PutProduct',
  data: function () {
    return {
      productname: '',
      price: '',
      minPrice: '',
      image: ''
    }
  },
}
</script>

<style scoped>

</style>
