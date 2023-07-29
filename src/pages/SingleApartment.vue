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
        <h2 class="pb-4 pt-3 text-center">{{ apartment.title }}</h2>
        <div class="d-flex justify-content-center">
          <img class="rounded-4 shadow-lg" style="width: 70%" :src="`${apiUrl}/storage/${apartment.image}`"
            alt="immagine">
        </div>

        <div class="info-container p-3 mt-3 container-fluid shadow">
          <div class="indirizzo px-2">
            <span><i>{{ apartment.address }}</i></span>
          </div>
          <div class="utenze row my-3 px-2">
            <span class="col-lg-3 col-md-6 col-sm-12 mb-2"><strong>Stanze:</strong> {{ apartment.room }}</span>
            <span class="col-lg-3 col-md-6 col-sm-12 mb-2"><strong>Bagni:</strong> {{ apartment.bathroom }}</span>
            <span class="col-lg-3 col-md-6 col-sm-12 mb-2"><strong>Letti:</strong> {{ apartment.bed }}</span>
            <span class="col-lg-3 col-md-6 col-sm-12 mb-2"><strong>Metri quadrati:</strong> {{ apartment.sq_meters
            }}</span>
          </div>

          <div class="mt-3 servizi container-fluid">
            <p><strong>Servizi:</strong></p>
            <div class="row">
              <div v-for="elem in apartment.amenities" :key="elem.id" class="my-2 col-lg-4 col-md-4 col-sm-6">
                <img class="me-3" :src="`${apiUrl}/storage/${elem.image}`" alt="elem.name" style="height: 30px">
                <span class="">{{ elem.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <MessageComp v-if="apartment.id" :apartment_id="apartment.id" />


      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.utenze,
.indirizzo,
.servizi {
  font-size: 1.2rem;
}

.contenitore-tot {
  background-color: #E8F3FE;
}

.info-container {
  background-color: rgba($color: #FFFFFF, $alpha: 0.5);
  border-radius: 0.5rem;
}
</style>