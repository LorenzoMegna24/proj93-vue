<script >
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
      baseUrl: 'http://127.0.0.1:8000'
    }
  },
  mounted() {
    this.getApartments(1);
    this.getAmenities();
  },
  watch: {
    selectedAmenities: {
      handler: 'getApartments',
      deep: true,
    }
  },
  methods: {
    getApartments(apartmentApiPAge) {
      const params = {
        page: apartmentApiPAge
      }

      if (this.selectedAmenities.length > 0) {
        params.amenities_id = this.selectedAmenities.join(',');
      }

      axios.get(`${this.baseUrl}/api/apartments`, { params }).then(res => {
        this.apartments = res.data.apartments.data
        this.currentPage = res.data.apartments.current_page
        this.lastPage = res.data.apartments.last_page
      })
    },
    getAmenities() {
      axios.get(`${this.baseUrl}/api/amenities`).then(res => {
        this.amenities = res.data.amenities
      })
    }
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
      </div>
    </div>
    <!-- /Offcanvas amenities -->
    <div class="row justify-content-around pt-5">
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
  </div>
  <nav aria-label="Page navigation">
    <ul class="pagination    ">
      <li class="page-item">
        <a class="page-link" @click.prevent="getProjects(currentPage - 1)" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="(currentPage === elem) ? 'active' : ''" aria-current="page"
        v-for="(elem, index) in lastPage" :key="index">
        <a class="page-link" @click.prevent="getApartments(elem)" href="#">{{ elem }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click.prevent="getApartments(currentPage + 1)" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.form-check-input {
  border-color: rgb(70, 68, 68);
}
</style>