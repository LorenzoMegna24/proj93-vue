<script>
import axios from 'axios';
import FooterComp from '../components/FooterComp.vue';


export default {
  name: 'ApartmentList',
  data() {
    return {
      apartments: [],
      amenities: null,
      selectedAmenities: [],
      currentPage: 1,
      lastPage: null,
      baseUrl: 'http://127.0.0.1:8000',
      minRooms: null,
      minBeds: null,
      freeformAddress: null,
      addressSuggestions: [],
      selectedRadius: '20',
      searched: false,
    }
  },
  components: {
    FooterComp
  },
  mounted() {
    this.getAmenities();
  },
  methods: {
    searchApartments() {
      const offcanvasElement = document.getElementById('offcanvasExample');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.hide();
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

      if (this.minRooms) {
        params.min_rooms = this.minRooms;
      }

      if (this.minBeds) {
        params.min_beds = this.minBeds;
      }

      if (this.selectedAmenities.length > 0) {
        params.amenities_id = this.selectedAmenities.join(',');
      }

      if (this.location) {
        const url = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(this.location) + '.json?key=asb5Pwh7kCfYH2ak33Rwa7ebLVG3P4GF';
        axios.get(url).then(res => {
          if (res.data.results && res.data.results.length > 0) {
            this.freeformAddress = res.data.results[0].address.freeformAddress;
            const latitude = res.data.results[0].position.lat;
            const longitude = res.data.results[0].position.lon;

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
        this.$nextTick(() => {
          this.$refs.results.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },
    getAmenities() {
      axios.get(`${this.baseUrl}/api/amenities`).then(res => {
        this.amenities = res.data.amenities
      })
    },
  }
}
</script>

<template>
  <main class="main-container">

    <div>

      <!-- Offcanvas amenities -->

      <div class=" d-flex justify-content-center align-items-center general-container">

        <!-- Ricerca geografica -->
        <div class="input-container position-relative p-3 rounded-3 shadow">
          <h3 class="text-color">Cerca una località</h3>

          <div class="row">
            <div class="">
              <div class="w-100">
                <input class="form-control input-indirizzo border-black" type="text" v-model="location"
                  placeholder="Inserisci un indirizzo o una città" @input="getAddressSuggestions">
                <ul class="list-group position-absolute" v-if="addressSuggestions.length > 0">
                  <li class="list-group-item list-group-item-action lista-indirizzi" style="cursor: pointer;"
                    v-for="(address, index) in addressSuggestions" :key="index" @click="selectAddress(address)">
                    {{ address }}
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="mt-2">Servizi</h4>
              </div>
              <div class="servizi overflow-auto">
                <!-- ciclo servizi -->
                <div class="form-check d-flex flex-wrap">
                  <div class="form-check-label me-5 mb-3 d-flex align-items-center" v-for="(elem, index) in amenities"
                    :key="index" for="flexCheckDefault">
                    <input class="form-check-input me-2" type="checkbox" :value="elem.id" v-model="selectedAmenities"
                      id="">
                    <img :src="`${baseUrl}/storage/${elem.image}`" :alt="elem.name" style="height: 30px;">
                    <p class="mb-0 ms-2">{{ elem.name }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <h4>Numero minimo di stanze</h4>
                <input class="form-control border-black" type="number" v-model="minRooms" min="1" max="20"
                  style="width: 100px;">
              </div>
              <div class="mt-2">
                <h4>Posti letto</h4>
                <input class="form-control border-black" type="number" v-model="minBeds" min="1" max="20"
                  style="width: 100px;">
              </div>
              <div class="mt-2">
                <h4 for="radius-range">Raggio di ricerca:</h4>
                <input id="radius-range" type="range" min="1" max="20" step="1" v-model="selectedRadius">
                <div>{{ selectedRadius }} km</div>
              </div>
              <button @click="searchApartments" class="btn btn-primary">Cerca</button>
            </div>
          </div>
        </div>
      </div>

      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

      </div>
      <!-- /Offcanvas amenities -->

      <!-- Appartamenti dopo la ricerca -->

      <div ref="results" class="big-container" v-if="searched">
        <div class="container-fluid container-cards pb-3">

          <div v-if="freeformAddress" class="mt-5 text-km pb-3 alert alert-primary w-25">
            Risultati per {{ freeformAddress }} nel raggio di {{ selectedRadius }}Km:
          </div>

          <div class="row">




            <div v-if="searched && apartments.length === 0" class="text-center my-3">
              Non ci sono b&b che corrispondono ai filtri selezionati
            </div>



            <div class="col-lg-4 col-md-6 col-sm-12 my-3" v-for="(elem, index) in apartments" :key="index">

              <RouterLink class="text-decoration-none" :to="{ name: 'apartment', params: { slug: elem.slug } }">

                <div class="card single-card border-0 shadow">
                  <div class="container-img-top rounded-top-3">
                    <img class="card-img-top" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
                  </div>
                  <div class="card-body rounded-bottom-3" v-bind:class="{ 'sponsored': elem.sponsored_order === 0 }">
                    <div v-if="elem.sponsored_order === 0" class="sponsored-label">Consigliato</div>
                    <h5>{{ elem.title }}</h5>
                    <p class="card-text">{{ elem.address }}</p>
                    <p><strong>Distanza:</strong> {{ elem.distance.toFixed(2) }} km</p>
                    <p><strong>Stanze:</strong> {{ elem.room }}</p>
                    <p><strong>Letti:</strong> {{ elem.bed }}</p>
                    <p class="mb-1"><strong>Servizi:</strong></p>
                    <p class="d-flex flex-wrap">
                      <span v-for="amenity in elem.amenities" :key="amenity.id">
                        <img class="me-2" :src="`${baseUrl}/storage/${amenity.image}`" :alt="amenity.name"
                          style="height: 20px">
                      </span>
                    </p>
                  </div>
                </div>

              </RouterLink>
            </div>

          </div>
        </div>
      </div>


      <div class="d-flex justify-content-center">
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

      <FooterComp></FooterComp>

    </div>

  </main>
</template>

<style lang="scss" scoped>
.form-check-input {
  border-color: rgb(70, 68, 68);
}

.main-container {

  .general-container {
    background-image: url('/public/img/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 25px 0;

    .input-container {
      background-color: rgba($color: #FFFFFF, $alpha: 0.8);
      color: #1557C0;

      .servizi {
        max-height: 409px;
      }

      .input-indirizzo {
        height: 2.5rem;
        margin-top: 0.9rem;


      }

      .lista-indirizzi {
        width: 30rem;
        max-height: 5rem;
        z-index: 1;
      }

      .btn-color {
        background-color: #2382F7;
        color: white;

      }
    }
  }

}

.main-container {
  background-color: #E8F3FE;
}

.big-container {

  .container-cards {

    .text-km {
      font-weight: 600;
      font-size: 1.2rem;
      color: #2382F7;
    }

    .sponsored {
      border: 2px solid #2382F7;

      .sponsored-label {
        border-radius: 10px;
        position: absolute;
        bottom: 55px;
        right: 10px;
        background-color: #2382F7;
        color: white;
        padding: 5px 10px;
        font-size: 12px;
        text-transform: uppercase;
        transform-origin: 0 0;
        text-align: center;
        width: 110px;
        font-weight: bolder;
      }
    }

    .single-card {
      height: 34rem;
      background-color: rgba($color: #FFFFFF, $alpha: 0.6);


    }

    h5 {
      color: #2382F7;
    }

    .container-img-top {
      overflow: hidden;
    }

    .card-img-top {
      height: 18rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

    .card-text {
      font-style: oblique;
    }
  }
}


.offcanvas-header {
  background-color: #E8F3FE;
}

p {
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 425px) {
  .main-container {
    height: 50vh;

    .input-container {
      width: 75%;


    }


  }
}



@media screen and (min-width: 426px) {
  .main-container {
    .input-container {
      width: 60%;
    }

    .general-container {
      padding: 45px 0;
    }
  }

}



@media screen and (min-width: 1000px) {
  .main-container {
    .input-container {
      width: 50%;

    }
  }
}
</style>