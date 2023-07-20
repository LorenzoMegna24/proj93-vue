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
  <div class="container mt-5">
    <!-- Offcanvas amenities -->
    <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      Link with href
    </a>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <h2>Servizi</h2>
        </div>
        <div class=" mt-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Default checkbox
            </label>
          </div>
        </div>
      </div>
    </div> 
    <!-- Offcanvas amenities -->
    <div class="row justify-content-around pt-5">
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
  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>