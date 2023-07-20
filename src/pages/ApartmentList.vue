<script >
  import axios from 'axios';

  export default{
    name: 'ApartmentList',
    data(){
        return{
            apartments:[],
            amenities:[],
            baseUrl:'http://127.0.0.1:8000'
        }
      },
      mounted(){
        this.getApartments();
        this.getAmenities();
      },
      methods:{
        getApartments(){
          axios.get(`${this.baseUrl}/api/apartments`).then(res=>{
            this.apartments = res.data.apartments.data
          })
        },
        getAmenities(){
          axios.get(`${this.baseUrl}/api/amenities`).then(res=>{
            this.amenities = res.data.amenities
          })
        }
      }
  }
</script>

<template>
  <div class="container mt-5">
    <!-- Offcanvas amenities -->
    <a class="btn btn-primary mt-5" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      Filtri
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
          <div class="form-check d-flex flex-column">
            <label class="form-check-label mb-2" v-for="(elem, index) in amenities" :key="index" for="flexCheckDefault">
            <input class="form-check-input" type="checkbox" :value="elem.id" id="">
              <img :src="`${baseUrl}/storage/${elem.image}`" :alt="elem.name" style="height: 30px;"> 
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