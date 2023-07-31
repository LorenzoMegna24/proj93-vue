<script>

export default {
    name: 'FooterComp',
    data() {
        return {

        }
    },

    methods: {
        scrollToTop() {
            const element = document.documentElement;

            element.scrollIntoView({ behavior: "smooth" });
        },
    },
}
</script>

<template>
    <footer>
        <div class="footer-content container-fluid px-5 py-3 shadow">

            <div class="row">

                <div class="contact-info d-flex justify-content-center col-lg-4 col-sm-4 col-12 mb-3">
                    <div>
                        <h4 class="pb-2">Contattaci</h4>
                        <p><strong>Email:</strong> boolbnb@gmail.com</p>
                        <p><strong>Telefono:</strong> +39 123 456789</p>
                        <p><strong>Orari di contatto:</strong> Lun-Ven 9:00 - 18:00</p>
                    </div>
                </div>

                <div class="social-links col-lg-4 col-sm-4 col-12 d-flex justify-content-center">
                    <div>
                        <h4 class="mb-3">Seguici</h4>
                        <span class="me-2">
                            <i class="fa-brands fa-facebook fa-xl"></i>
                        </span>
                        <span class="me-2">
                            <i class="fa-brands fa-instagram fa-xl"></i>
                        </span>
                        <span>
                            <i class="fa-brands fa-twitter fa-xl"></i>
                        </span>
                    </div>
                </div>

                <div class="site-links col-lg-4 col-sm-4 col-12 d-flex justify-content-center">
                    <div>
                        <h4 class="mb-3">Naviga</h4>
                        <ul>
                            <li>
                                <RouterLink class="nav-link" :to="{ name: 'home' }" @click="scrollToTop">Home</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="nav-link" :to="{ name: 'apartments' }" @click="scrollToTop">Ricerca
                                    avanzata</RouterLink>
                            </li>
                            <li>
                                <a href="http://127.0.0.1:8000/login">Accedi</a>
                            </li>
                            <li>
                                <a href="http://127.0.0.1:8000/register">Registrati</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div class="footer-signs text-center">
                <p class="mb-0 mt-2">
                    <i> Made with &hearts; by Francesca Di Domenico, Alessandro Casentini, Lorenzo Megna, Mattia Di
                        Cunto</i>
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer-content {
    background-image: linear-gradient(to bottom, #e8f3fe, #f0f5ff, #f6f8ff, #fbfbff, #ffffff);
    color: rgba($color: #000000, $alpha: 0.8);
    position: sticky;
    bottom: 0;
    right: 0;
    left: 0;

    .contact-info {

        p {
            margin-bottom: 0.5rem;
        }
    }

    .site-links {
        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                margin-bottom: 0.2rem;

                a {
                    text-decoration: none;
                    color: rgba($color: #000000, $alpha: 0.8);

                }

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .footer-signs {
        p {
            font-size: 0.8rem;
        }
    }
}


@media screen and (max-width: 576px) {
    .footer-content {
        .contact-info {
            justify-content: start !important;
            margin: 0.3rem 0 1.2rem 0;
        }

        .social-links {
            justify-content: start !important;
            margin: 1.2rem 0;
        }

        .site-links {
            justify-content: start !important;
            margin: 1.2rem 0;
        }
    }
}
</style>