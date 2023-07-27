<script >
import axios from 'axios';
import SponsorComp from '../components/SponsorComp.vue';

export default {
  name: 'AppHome',

  components: {
    SponsorComp
  },
  data() {
    return {
      apartments: [],
      amenities: null,
      selectedAmenities: [],
      currentPage: 1,
      lastPage: null,
      baseUrl: 'http://127.0.0.1:8000',
      freeformAddress: null,
      addressSuggestions: [],
      selectedRadius: '20',
      searched: false,
    }
  },
  methods: {
    searchApartments() {
      this.getApartments(1);
      this.searched = true;
    },
    getAddressSuggestions() {
      if (this.location) {
        const url = 'https://api.tomtom.com/search/2/search/' + encodeURIComponent(this.location) + '.json?typeahead=true&limit=5&key=asb5Pwh7kCfYH2ak33Rwa7ebLVG3P4GF';
        axios.get(url).then(res => {
          if (res.data.results && res.data.results.length > 0) {
            this.addressSuggestions = res.data.results.map(result => result.address.freeformAddress);
          } else {
            this.addressSuggestions = [];
          }
        });
      } else {
        this.addressSuggestions = [];
      }
    },
    selectAddress(address) {
      this.location = address;
      this.addressSuggestions = [];
    },
    getApartments(apartmentApiPage) {
      const params = {
        page: apartmentApiPage,
        radius: this.selectedRadius,
      }

      if (this.location) {
        const url = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(this.location) + '.json?key=asb5Pwh7kCfYH2ak33Rwa7ebLVG3P4GF';
        axios.get(url).then(res => {
          if (res.data.results && res.data.results.length > 0) {
            this.freeformAddress = res.data.results[0].address.freeformAddress;
            const latitude = res.data.results[0].position.lat;
            const longitude = res.data.results[0].position.lon;

            // Invia la latitudine e longitudine come parametri della richiesta
            params.latitude = latitude;
            params.longitude = longitude;

            this.fetchApartments(params);
          }
        });
      } else {
        this.fetchApartments(params);
      }
    },
    fetchApartments(params) {
      console.log('Parametri della richiesta:', params);
      axios.get(`${this.baseUrl}/api/apartments`, { params }).then(res => {
        if (res.data.apartments) {
          this.apartments = res.data.apartments.data;
          this.currentPage = res.data.apartments.current_page;
          this.lastPage = res.data.apartments.last_page;
        } else {
          this.apartments = []
        }
      });
    }
  },
}
</script>

<template>

  <section>

    <div class="container">
      <h1 class="mt-5 pt-2">Welcome</h1>
    </div>

    <div>
      <SponsorComp />
    </div>

    <div class="my-3 container">
      <!-- Ricerca geografica -->
      <h2>Ricerca una località</h2>
      <input class="form-control" type="text" v-model="location" placeholder="Inserisci indirizzo o città"
        @input="getAddressSuggestions">
      <ul class="list-group mt-2" v-if="addressSuggestions.length > 0">
        <li class="list-group-item list-group-item-action" style="cursor: pointer;"
          v-for="(address, index) in addressSuggestions" :key="index" @click="selectAddress(address)">
          {{ address }}
        </li>
      </ul>
      <button @click="searchApartments" class="btn btn-primary mt-3">Cerca</button>
      <div v-if="freeformAddress" class="my-3">
        Risultati per {{ freeformAddress }} nel raggio di {{ selectedRadius }}Km:
      </div>



      <div class="row justify-content-around pt-5">


        <div v-if="searched && apartments.length === 0" class="text-center my-3">
          Non ci sono appartamenti nella località selezionata
        </div>

        <div class="col-3 m-2" v-for="(elem, index) in apartments" :key="index">
          <div class="card">
            <img class="card-img-top" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
            <div class="card-body">
              <RouterLink :to="{ name: 'apartment', params: { slug: elem.slug } }">
                <h4>{{ elem.title }}</h4>
              </RouterLink>
              <p class="card-text">{{ elem.address }}</p>
              <p>Stanze: {{ elem.room }}</p>
              <p>Letti: {{ elem.bed }}</p>
              <p class="mb-0">Servizi:</p>
              <p class="d-flex flex-wrap">
                <span v-for="amenity in elem.amenities" :key="amenity.id">
                  <img class="me-2" :src="`${baseUrl}/storage/${amenity.image}`" :alt="amenity.name" style="height: 20px">
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <nav v-if="apartments.length > 0" aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" @click.prevent="getApartments(currentPage - 1)" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{ 'active': currentPage === elem }" v-for="elem in lastPage" :key="elem">
            <a class="page-link" @click.prevent="getApartments(elem)" href="#">{{ elem }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === lastPage }">
            <a class="page-link" @click.prevent="getApartments(currentPage + 1)" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

  </section>
</template>

<style lang="scss" scoped>
  section{
    background-color: rgb(204, 228, 253);
  }
</style>