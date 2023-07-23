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
  <div class="p-4 container">

    <h2 class="pt-5">{{ apartment.title }}</h2>
    <img style="height: 250px" :src="`${apiUrl}/storage/${apartment.image}`" alt="immagine">
    <p>Stanze: {{ apartment.room }}</p>
    <p>Bagni: {{ apartment.bathroom }}</p>
    <p>Letti: {{ apartment.bed }}</p>
    <p>Metri quadrati: {{ apartment.sq_meters }}</p>
    <p>Indirizzo: {{ apartment.address }}</p>

    <div>
      <p>Servizi:</p>
      <div v-for="elem in apartment.amenities" :key="elem.id">
        <img class="me-3" :src="`${apiUrl}/storage/${elem.image}`" alt="elem.name" style="height: 20px">
      </div>
    </div>

    <MessageComp />

  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>