<script>
import axios from 'axios';

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
    }
  },
  mounted() {
    this.getApartments(1);
    this.getAmenities();
  },
  methods: {
    searchApartments() {
      const offcanvasElement = document.getElementById('offcanvasExample');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.hide();
      this.getApartments(1); // Aggiungiamo il parametro della pagina (1) per resettare la paginazione
    },
    getApartments(apartmentApiPage) {
      const params = {
        page: apartmentApiPage,
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

      // Ottieni la latitudine e longitudine dell'indirizzo o della città inserita dall'utente
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
  <div class="container mt-5">
    <!-- Offcanvas amenities -->
    <a class="btn btn-primary mt-5" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
      aria-controls="offcanvasExample">
      Filtri
    </a>
    <div class="my-3">
      <h2>Ricerca per posizione geografica</h2>
      <input class="form-control" type="text" v-model="location" placeholder="Inserisci indirizzo o città">
      <button @click="searchApartments" class="btn btn-primary mt-3">Cerca</button>
    </div>
    <div v-if="freeformAddress" class="my-3">
      Risultati per {{ freeformAddress }}:
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filtri</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <h2>Servizi</h2>
        </div>
        <div class="mt-3">
          <div class="form-check d-flex flex-wrap">
            <label class="form-check-label me-5 mb-2 d-flex align-items-center" v-for="(elem, index) in amenities"
              :key="index" for="flexCheckDefault">
              <input class="form-check-input me-2" type="checkbox" :value="elem.id" v-model="selectedAmenities" id="">
              <img :src="`${baseUrl}/storage/${elem.image}`" :alt="elem.name" style="height: 30px;">
            </label>
          </div>
        </div>
        <div class="my-3">
          <h2>Numero minimo di stanze</h2>
          <input class="form-control" type="number" v-model="minRooms" min="1" max="20" style="width: 100px;">
        </div>
        <div class="my-3">
          <h2>Posti letto</h2>
          <input class="form-control" type="number" v-model="minBeds" min="1" max="20" style="width: 100px;">
        </div>
        <button @click="searchApartments" class="btn btn-primary">Cerca</button>
      </div>

    </div>
    <!-- /Offcanvas amenities -->
    <div class="row justify-content-around pt-5">


      <div v-if="apartments.length === 0" class="text-center my-3">
        Non ci sono appartamenti che corrispondono ai filtri selezionati
      </div>
      <div class="col-3 m-2" v-for="(elem, index) in apartments" :key="index">
        <div class="card">
          <img class="card-img-top" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
          <div class="card-body">
            <RouterLink :to="{ name: 'apartment', params: { slug: elem.slug } }">
              <h4>{{ elem.title }}</h4>
            </RouterLink>
            <p class="card-text">{{ elem.address }}</p>
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
</template>

<style lang="scss" scoped>
.form-check-input {
  border-color: rgb(70, 68, 68);
}
</style>