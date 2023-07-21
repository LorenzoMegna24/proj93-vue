<script>
import axios from 'axios';

export default {

  name: 'SingleApartment',
  data() {
    return {
      apartment: {},
      apiUrl: 'http://127.0.0.1:8000',
    }
  },

  created() {
    this.singleApartment()
  },

  methods: {

    singleApartment() {

      axios.get(`${this.apiUrl}/api/apartments/${this.$route.params.slug}`).then((res) => {
        if (res.data.success) {

          this.apartment = res.data.apartment;
          console.log(this.apartment)
        } else {
          // redirect alla pagina 404
          this.$router.push({ name: 'not-found' })
        }
      });
    }

  }
}

</script>

<template>
  <div class="p-4">

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

    <form class="p-3 my-4 w-50 border rounded-3">
      <div class="mb-3">
        <label for="InputName" class="form-label">Nome</label>
        <input type="text" class="form-control" id="InputName">
      </div>

      <div class="mb-3">
        <label for="InputSurname" class="form-label">Cognome</label>
        <input type="text" class="form-control" id="InputSurname">
      </div>

      <div class="mb-3">
        <label for="InputEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp">
      </div>

      <div class="mb-3">
        <label for="TextMessage" class="form-label">Messaggio</label>
        <textarea class="form-control" id="TextMessage" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Invia</button>
    </form>

  </div>
</template>

<style lang="scss">
@use '../style/main.scss';
</style>