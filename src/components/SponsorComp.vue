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

    <div class="container carosello">

        <h3>Appartamenti in evidenza</h3>

        <Carousel id="activeClasses" :itemsToShow="3.95" :wrapAround="true" :transition="500">
            <Slide class="carousel__slide" v-for="(slide, index) in apartments" :key="index">
                <RouterLink class="carousel__item cliccabile"
                            :to="{ name: 'apartment', params: { slug: slide.slug } }">
                    <img class="card-img-top rounded-top" :src="`${baseUrl}/storage/${slide.image}`" alt="Title">
                    <div class="card-body">
                        <div class="testo-card"
                            :to="{ name: 'apartment', params: { slug: slide.slug } }">
                            <h4>{{ slide.title }}</h4>
                        </div>
                        <p class="card-text">{{ slide.address }}</p>
                        <p class="fst-italic">Stanze: {{ slide.room }}</p>
                        <p class="fst-italic">Letti: {{ slide.bed }}</p>
                        <p class="mb-1 fst-italic">Servizi:</p>
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

    <div class="container">

    </div>

</template>

<style lang="scss" scoped>

@media screen and (min-width: 425px) {
    
    .carosello{
        
        .carousel__slide {
            padding: 5px;
            
            .cliccabile{
                border-radius: 10px;
                background-color: rgba($color: #FFFFFF, $alpha: 0.6);
                color: black;
                text-decoration: none;
                
            }
            
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

    .carousel__slide--active ~ .carousel__slide {
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


.card-cont{
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

    @media screen and (max-width:425px) {

        .carosello{
            display: none;
        }
        .main-container{
            margin-left: 25px;
            .card-cont{
                flex-direction: column;
                
                .card{
                    width: 80vw;
                }
            }
    
        }
    }

</style>