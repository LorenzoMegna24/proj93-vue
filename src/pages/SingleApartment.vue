<script>
import axios from 'axios';
import MessageComp from '../components/MessageComp.vue';

export default {
  name: "SingleApartment",

  components: {
    MessageComp
  },

  data() {
    return {
      apartment: {},
      apiUrl: "http://127.0.0.1:8000",
    };
  },

  created() {
    this.singleApartment();
  },

  methods: {
    singleApartment() {
      axios.get(`${this.apiUrl}/api/apartments/${this.$route.params.slug}`).then((res) => {
        if (res.data.success) {
          this.apartment = res.data.apartment;
          console.log(this.apartment);
        }
        else {
          // redirect alla pagina 404
          this.$router.push({ name: "not-found" });
        }
      });
    }
  },

}

</script>

<template>
<div class="contenitore-tot">
  <div class="p-4 container d-flex">
    <div class="row">
      <h2 class="pt-5">{{ apartment.title }}</h2>
      <div class="d-flex justify-content-center">
        <img class="rounded-4 shadow-lg" style="width: 70%" :src="`${apiUrl}/storage/${apartment.image}`" alt="immagine">
      </div>
      <div class="mt-3 indirizzo">
        <span><i>{{ apartment.address }}</i></span>
      </div>
      <div class="utenze d-flex justify-content-between mt-3">
        <span><strong>Stanze:</strong> {{ apartment.room }}</span>
        <span><strong>Bagni:</strong> {{ apartment.bathroom }}</span>
        <span><strong>Letti:</strong> {{ apartment.bed }}</span>
        <span><strong>Metri quadrati:</strong> {{ apartment.sq_meters }}</span>
      </div>
  
      <div class="mt-3 servizi">
        <p><strong>Servizi:</strong></p>
        <div v-for="elem in apartment.amenities" :key="elem.id" class="mb-2">
            <img class="me-3" :src="`${apiUrl}/storage/${elem.image}`" alt="elem.name" style="height: 30px">
            <span class="">{{ elem.name }}</span>
        </div>
      </div>
  
      <MessageComp v-if="apartment.id" :apartment_id="apartment.id" />
  

    </div>  
  </div>
</div>
</template>

<style lang="scss" scoped>

  .utenze, .indirizzo, .servizi{
    font-size: 20px;
  }

  .contenitore-tot{
    background-color: #E8F3FE;
  }

</style>