<script >
  import axios from 'axios';

  export default{
    name: 'AppHome',
    data(){
        return{
            apartments:[],
            baseUrl:'http://127.0.0.1:8000'
        }
      },
      mounted(){
        this.getApartments();
      },
      methods:{
        getApartments(){
          axios.get(`${this.baseUrl}/api/apartments`).then(res=>{
            this.apartments = res.data.apartments.data
          })
        }
      }
  }
</script>

<template>
  <div class="row">
    <div class="col-3 m-2" v-for="(elem,index) in apartments" :key="index">

      <div class="card">
        <img class="card-img-top" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
        <div class="card-body">
          <h4 class="card-title">{{elem.title}}</h4>
          <p class="card-text">{{elem.address}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>