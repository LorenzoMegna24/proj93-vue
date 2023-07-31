<script>
import axios from 'axios';
import { Carousel, Pagination, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default {
    name: 'SponsorComp',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },

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
    <div class="container carosello py-4">

        <h3 class="my-2">Appartamenti in evidenza</h3>

        <Carousel id="activeClasses" :autoplay="2000" :itemsToShow="3.95" :wrapAround="true" :transition="500">
            <Slide class="carousel__slide" v-for="(slide, index) in apartments" :key="index">
                <RouterLink class="carousel__item cliccabile" :to="{ name: 'apartment', params: { slug: slide.slug } }">
                    <img class="card-img-top rounded-top" :src="`${baseUrl}/storage/${slide.image}`" alt="Title">
                    <div class="card-body">
                        <div class="testo-card" :to="{ name: 'apartment', params: { slug: slide.slug } }">
                            <h4>{{ slide.title }}</h4>
                        </div>
                        <p class="card-text">{{ slide.address }}</p>
                        <p class="fst-italic">Stanze: {{ slide.room }}</p>
                        <p class="fst-italic">Letti: {{ slide.bed }}</p>
                        <p class="d-flex flex-wrap justify-content-center">
                            <span v-for="amenity in slide.amenities" :key="amenity.id">
                                <img class="me-2" :src="`${baseUrl}/storage/${amenity.image}`" :alt="amenity.name"
                                    style="height: 20px">
                            </span>
                        </p>
                    </div>
                </RouterLink>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>

    </div>


    <div class="card-section">

        <div class="main-container">

            <h3 class="my-2">Appartamenti in evidenza</h3>
            <!-- card appartamenti in evidenza -->
            <div class="col-3 p-2" v-for="(elem, index) in apartments" :key="index">

                <RouterLink class="card card-cont text-decoration-none"
                    :to="{ name: 'apartment', params: { slug: elem.slug } }">
                    <img class="card-img-top" :src="`${baseUrl}/storage/${elem.image}`" alt="Title">
                    <div class="card-body">
                        <h4>{{ elem.title }}</h4>
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
                </RouterLink>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 769px) {

    .card-section {
        display: none;
    }

    .carosello {

        .carousel__slide {
            padding: 5px;

            .cliccabile {
                border-radius: 10px;
                background-color: rgba($color: #FFFFFF, $alpha: 0.6);
                color: black;
                text-decoration: none;

                img {
                    max-width: fit-content;
                    height: 200px;
                }

            }

        }

        ol,
        ul {
            padding-left: 0;
        }

    }

    .carousel__viewport {
        perspective: 2000px;
    }

    .carousel__track {
        transform-style: preserve-3d;
    }

    .carousel__slide--sliding {
        transition: 0.5s;
    }

    .carousel__slide {
        opacity: 0.9;
        transform: rotateY(-20deg) scale(0.9);
    }

    .carousel__slide--active~.carousel__slide {
        transform: rotateY(20deg) scale(0.9);
    }

    .carousel__slide--prev {
        opacity: 1;
        transform: rotateY(-10deg) scale(0.95);
    }

    .carousel__slide--next {
        opacity: 1;
        transform: rotateY(10deg) scale(0.95);
    }

    .carousel__slide--active {
        opacity: 1;
        transform: rotateY(0) scale(1.1);
    }

}


.card-cont {
    display: flex;
    flex-direction: row;



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

@media screen and (max-width: 768px) {

    .carosello {
        display: none;
    }

    .main-container {
        margin-left: 10%;

        .card-cont {
            flex-direction: column;
            width: 80vw;
        }

    }
}
</style>