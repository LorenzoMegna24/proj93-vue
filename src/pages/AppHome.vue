<script >
import axios from 'axios';
import SponsorComp from '../components/SponsorComp.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'AppHome',

  components: {
    SponsorComp,
    RouterLink
  },
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
  mounted() {
    this.getAmenities();
  },

  methods: {
    getAmenities() {
      axios.get(`${this.baseUrl}/api/amenities`).then(res => {
        this.amenities = res.data.amenities;
      });
    },
    searchApartments() {
      this.getApartments(1);
      this.searched = true;
      this.hideOffcanvas();
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
        this.$nextTick(() => {
          this.showResults = true;
          this.$refs.results.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },
    getAmenities() {
      axios.get(`${this.baseUrl}/api/amenities`).then(res => {
        this.amenities = res.data.amenities
      })
    },
    hideOffcanvas() {
      let offcanvasElement = document.getElementById('offcanvasExample');
      let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
      offcanvasInstance.hide();
    }
  }

}
</script>

<template>
  <section>

    <!-- welcome div -->
    <div class="welcome d-flex align-items-center">

      <!-- Ricerca geografica -->

      <div class="py-5 container d-flex justify-content-center align-items-center">

        <div class="cont-ricerca p-3 position-relative">

          <h2 class="testo">Cerca una località</h2>

          <!-- barra di ricerca e bottone -->

          <div class="d-flex align-items-center int-bot w-100">

            <input class="form-control" type="text" v-model="location" autocomplete="off"
              placeholder="Inserisci un indirizzo o una città" @input="getAddressSuggestions">

            <button @click="searchApartments" class="btn btn-primary ms-3 cerca">Cerca</button>

          </div>

          <!-- lista degli indirizzi consigliati -->
          <ul class="list-group position-absolute" v-if="addressSuggestions.length > 0">
            <li class="list-group-item list-group-item-action lista-indirizzi" style="cursor: pointer;"
              v-for="(address, index) in addressSuggestions" :key="index" @click="selectAddress(address)">
              {{ address }}
            </li>
          </ul>


        </div>

      </div>

    </div>

    <div ref="results" class="container d-flex" v-if="searched">

      <div class="col-4 filtri p-3 mt-3 mb-5 rounded d-none d-md-block">
        <div>
          <h5>Filtri</h5>
        </div>
        <div>
          <div>
            <h4>Servizi</h4>
          </div>
          <div class="mt-3">
            <div class="form-check d-flex flex-column" style="max-height: 350px; min-height: 250px; overflow-y: scroll;">
              <div class="form-check-label me-5 mb-2 d-flex align-items-center" v-for="(elem, index) in amenities"
                :key="index" for="flexCheckDefault">
                <input class="form-check-input me-2" type="checkbox" :value="elem.id" v-model="selectedAmenities" id="">
                <img :src="`${baseUrl}/storage/${elem.image}`" :alt="elem.name" style="height: 30px;">
                <p class="mb-0 ms-2">{{ elem.name }}</p>
              </div>
            </div>
          </div>
          <div class="my-4">
            <h4>Numero minimo di stanze</h4>
            <input class="form-control" type="number" v-model="minRooms" min="1" max="20" style="width: 100px;">
          </div>
          <div class="my-4">
            <h4>Posti letto</h4>
            <input class="form-control" type="number" v-model="minBeds" min="1" max="20" style="width: 100px;">
          </div>
          <div class="my-4">
            <h4 for="radius-range">Raggio di ricerca:</h4>
            <input id="radius-range" type="range" min="1" max="20" step="1" v-model="selectedRadius">
            <div>{{ selectedRadius }} km</div>
          </div>
          <button @click="searchApartments" class="btn btn-primary">Aggiorna</button>
        </div>
      </div>

      <!-- Mostra il componente Offcanvas solo su schermi più piccoli -->
      <div class="offcanvas offcanvas-start d-md-none" tabindex="-1" id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <h4>Servizi</h4>
          </div>
          <div class="mt-3">
            <div class="form-check d-flex flex-column" style="max-height: 350px; min-height: 250px; overflow-y: scroll;">
              <div class="form-check-label me-5 mb-2 d-flex align-items-center" v-for="(elem, index) in amenities"
                :key="index" for="flexCheckDefault">
                <input class="form-check-input me-2" type="checkbox" :value="elem.id" v-model="selectedAmenities" id="">
                <img :src="`${baseUrl}/storage/${elem.image}`" :alt="elem.name" style="height: 30px;">
                <p class="mb-0 ms-2">{{ elem.name }}</p>
              </div>
            </div>
          </div>
          <div class="my-4">
            <h4>Numero minimo di stanze</h4>
            <input class="form-control" type="number" v-model="minRooms" min="1" max="20" style="width: 100px;">
          </div>
          <div class="my-4">
            <h4>Posti letto</h4>
            <input class="form-control" type="number" v-model="minBeds" min="1" max="20" style="width: 100px;">
          </div>
          <div class="my-4">
            <h4 for="radius-range">Raggio di ricerca:</h4>
            <input id="radius-range" type="range" min="1" max="20" step="1" v-model="selectedRadius">
            <div>{{ selectedRadius }} km</div>
          </div>
          <button @click="searchApartments(); hideOffcanvas()" class="btn btn-primary">Aggiorna</button>

        </div>
      </div>

      <div class="mt-3 container-card col-12 col-md-8">
        <button class="btn btn-primary d-md-none d-block" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          Aggiungi filtri
        </button>


        <div v-if="searched && apartments.length" class="text-km">
          Risultati per {{ freeformAddress }} nel raggio di {{ selectedRadius }}Km:
        </div>

        <div v-if="searched && apartments.length === 0" class="text-center my-3">
          Non ci sono b&b nella località selezionata
        </div>

        <div class="my-3  w-100" v-for="(    elem, index    ) in     apartments    " :key="index">
          <div class="d-flex single-card w-100 rounded-3 shadow"
            v-bind:class="{ 'sponsored': elem.sponsored_order === 0 }">


            <div class="m-3 position-relative h-100 d-flex align-items-center">
              <div v-if="elem.sponsored_order === 0" class="sponsored-label">Consigliato</div>
              <RouterLink :to="{ name: 'apartment', params: { slug: elem.slug } }">
                <img class=" rounded-3" style="width: 250px; height: 200px; object-fit: cover;"
                  :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
              </RouterLink>
            </div>

            <div class="card-body p-3 pe-4">
              <RouterLink class="text-decoration-none" :to="{ name: 'apartment', params: { slug: elem.slug } }">
                <h5 class="mb-3">{{ elem.title }}</h5>
              </RouterLink>
              <div class="d-flex justify-content-between my-3">
                <em class="card-text">{{ elem.address }}</em>
                <em>Distanza {{ elem.distance.toFixed(2) }} km</em>
              </div>
              <p class="my-3">{{ elem.room }} Stanze </p>
              <p class="my-3">{{ elem.bed }} Letti</p>
              <p class="d-flex flex-wrap justify-content-between align-items-center my-3">

              <div>
                <span v-for="    amenity     in     elem.amenities    " :key="amenity.id">
                  <img class="me-2" :src="`${baseUrl}/storage/${amenity.image}`" :alt="amenity.name"
                    style="height: 20px">
                </span>
              </div>
              <RouterLink class="btn btn-primary mt-sm-2 mt-md-2 mt-lg-2"
                :to="{ name: 'apartment', params: { slug: elem.slug } }">
                Dettagli
              </RouterLink>

              </p>
            </div>
          </div>

        </div>




        <div class="d-flex justify-content-center mt-5">

          <nav v-if="apartments.length > 6" aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                <a class="page-link" @click.prevent="getApartments(currentPage - 1)" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" :class="{ 'active': currentPage === elem }" v-for="    elem     in     lastPage    "
                :key="elem">
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
    background-size: cover;
    background-repeat: no-repeat;
    height: 50vh;
    background-attachment: fixed;
    background-position: bottom center;

    .cont-ricerca {
      background-color: rgb(204, 228, 253, 0.7);
      border-radius: 25px;
      width: fit-content;

      .testo {
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

  .filtri {
    background-color: #FFFFFF;
    max-height: 900px;
    position: sticky;
    top: 5px;
  }

  .container-card {
    margin-inline: 1%;

    .text-km {
      font-weight: 600;
      font-size: 1.2rem;
      color: #2382F7;
    }

    .sponsored {
      border: 2px solid #2382F7;
      overflow: hidden;

      .sponsored-label {
        position: absolute;
        top: 70px;
        left: -45px;
        background-color: #2382F7;
        color: white;
        padding: 5px 10px;
        font-size: 12px;
        text-transform: uppercase;
        transform: rotate(-45deg);
        transform-origin: 0 0;
        text-align: center;
        width: 170px;
        font-weight: bolder;
      }
    }

    .single-card {

      background-color: rgba($color: #FFFFFF, $alpha: 0.6);

      h5 {
        color: #2382F7;
      }


    }
  }

  p {
    margin-bottom: 0.5rem;
  }


}

@media screen and (max-width:768px) {
  section {

    .welcome {
      height: 40vh;

      .cont-ricerca {
        max-width: 400px;

        .lista-indirizzi {
          width: 18rem;
        }
      }
    }
  }
}


@media screen and (max-width:425px) {
  section {

    .welcome {
      height: 30vh;
    }

    .cont-ricerca {


      .int-bot {
        display: flex;


        input {
          max-width: 250px;

          .lista-indirizzi {
            width: 250px;
          }
        }
      }
    }

    .sponsor {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }

  }
}
</style>