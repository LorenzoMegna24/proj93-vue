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
      this.$refs.results.scrollIntoView({ behavior: 'smooth' });
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
          this.apartments = [];
          this.$nextTick(() => {
            this.$refs.results.scrollIntoView({ behavior: 'smooth' });
          });
        }
      });
    }
  },
}
</script>

<template>
  <section>

    <!-- welcome div -->
    <div class="welcome d-flex align-items-center">

      <!-- Ricerca geografica -->

      <div class="py-5 container d-flex justify-content-center">

        <div class="cont-ricerca p-3">

          <h2 class="testo">Ricerca una località</h2>

          <!-- barra di ricerca e bottone -->

          <div class="d-flex align-items-center int-bot">

            <input class="form-control" type="text" v-model="location" autocomplete="off"
              placeholder="Inserisci indirizzo o città" @input="getAddressSuggestions">

            <button @click="searchApartments" class="btn btn-primary ms-3">Cerca</button>

          </div>

          <!-- lista degli indirizzi consigliati -->
          <ul class="list-group mt-2" v-if="addressSuggestions.length > 0">
            <li class="list-group-item list-group-item-action lista-indirizzi" style="cursor: pointer;"
              v-for="(address, index) in addressSuggestions" :key="index" @click="selectAddress(address)">
              {{ address }}
            </li>
          </ul>


        </div>

      </div>

    </div>

    <div ref="results" class="mt-3 container-card">

      <div v-if="searched && apartments.length" class="my-3">
        Risultati per {{ freeformAddress }} nel raggio di {{ selectedRadius }}Km:
      </div>

      <div class="row justify-content-around pt-5">

        <div v-if="searched && apartments.length === 0" class="text-center my-3">
          Non ci sono appartamenti nella località selezionata
        </div>

        <div class="col-lg-4 col-md-6 col-sm-12 my-3" v-for="(elem, index) in apartments" :key="index">
          <div class="card single-card border-0">
            <img class="card-img-top rounded-3" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
            <div class="card-body">
              <RouterLink class="text-decoration-none" :to="{ name: 'apartment', params: { slug: elem.slug } }">
                <h5>{{ elem.title }}</h5>
              </RouterLink>
              <p class="card-text">{{ elem.address }}</p>
              <p>Stanze: {{ elem.room }}</p>
              <p>Letti: {{ elem.bed }}</p>
              <p class="mb-1">Servizi:</p>
              <p class="d-flex flex-wrap">
                <span v-for="amenity in elem.amenities" :key="amenity.id">
                  <img class="me-2" :src="`${baseUrl}/storage/${amenity.image}`" :alt="amenity.name" style="height: 20px">
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <div class="d-flex justify-content-center mt-5">

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
    </div>

    <div class="sponsor">
      <SponsorComp />
    </div>

  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: rgb(204, 228, 253);

  .welcome {
    background-image: url("/img/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg");
    background-position: center;
    background-size: 100vw;
    background-repeat: no-repeat;
    height: 90vh;

    .cont-ricerca {
      background-color: rgb(204, 228, 253, 0.7);
      border-radius: 25px;
      width: fit-content;

      .testo{
          text-align: center;
          left: 50%;
        }

      input {
        width: 30rem;
        height: 3rem;
      }

      .lista-indirizzi {
        width: 30rem;
        max-height: 5rem;
      }
    }

  }

  .container-card {
    margin-inline: 1%;

    .single-card {
      height: 34rem;
      background-color: rgba($color: #FFFFFF, $alpha: 0.6);

      h5 {
        color: #2382F7;
      }

      .card-img-top {
        height: 18rem;
      }

      .card-text {
        font-style: oblique;
      }

    }
  }

  p {
    margin-bottom: 0.5rem;
  }

  .single-card:hover img {
    filter: brightness(0.7);
  }
}

@media screen and (min-width:768px){
    section{

      .welcome{
        background-size: 100vw;
        height: 70vh;
      }

    }
  }

  @media screen and (max-width:425px){
    section{

      .welcome{
        background-size: 100vw;
        height: 30vh;
      }

      .cont-ricerca{
        display: flex;
        flex-wrap: wrap;

        .int-bot{
          display: flex;
          flex-direction: column;

          input{
            max-width: 250px;
          }
        }
      }

      .sponsor{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
      }

    }
  }
</style>