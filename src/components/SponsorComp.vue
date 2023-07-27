<script>
import axios from 'axios';
export default {
    name: 'SponsorComp',
    data() {
        return {
            apartments: [],
            amenities: null,
            selectedAmenities: [],
            currentPage: 1,
            lastPage: null,
            baseUrl: 'http://127.0.0.1:8000',
        }
    },
    mounted() {
        this.fetchSponsoredApartments();
        this.getAmenities();
    },
    methods: {
        fetchSponsoredApartments() {
            axios.get(`${this.baseUrl}/api/sponsored-apartments`)
                .then(response => {
                    this.apartments = response.data.apartments;
                })
                .catch(error => {
                    // gestisci l'errore
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
    <div class="main-container mt-5 pt-4">
        <div class="container w-75">
            <h3>Appartamenti in evidenza</h3>

            <div class="row">
                <!-- card appartamenti in evidenza -->
                <div class="col-3 m-2" v-for="(elem, index) in apartments" :key="index">
                    <div class="card">
                        <img class="card-img-top" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
                        <div class="card-body">
                            <RouterLink class="text-decoration-none"
                                :to="{ name: 'apartment', params: { slug: elem.slug } }">
                                <h5>{{ elem.title }}</h5>
                            </RouterLink>
                            <p class="card-text">{{ elem.address }}</p>
                            <p>Stanze: {{ elem.room }}</p>
                            <p>Letti: {{ elem.bed }}</p>
                            <p class="mb-0">Servizi:</p>
                            <p class="d-flex flex-wrap">
                                <span v-for="amenity in elem.amenities" :key="amenity.id">
                                    <img class="me-2" :src="`${baseUrl}/storage/${amenity.image}`" :alt="amenity.name"
                                        style="height: 20px">
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>