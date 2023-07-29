<script >
import axios from 'axios';

export default {
    name: 'HeaderComp',
    data() {
        return {

        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand fixed-top navbar-light bg-light shadow">
        <div class="container">
            <RouterLink class="navbar-brand px-2" :to="{ name: 'home' }"><img src="/logo.png" style="width: 70px;" alt="">
            </RouterLink>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link me-2" :to="{ name: 'home' }" aria-current="page">Home <span
                                class="visually-hidden">(current)</span></RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'apartments' }">Ricerca avanzata</RouterLink>
                    </li>
                </ul>


                <div class="nav-item dropstart">
                    <button class="btn nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false" style="color: #5F5F5F;">
                        <i class="fas fa-user"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="http://127.0.0.1:8000/login">Accedi</a></li>
                        <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
                        <li> <a class="dropdown-item" href="http://127.0.0.1:8000/profile/apartments">Appartamenti</a></li>
                        <li> <a class="dropdown-item" href="http://127.0.0.1:8000/profile">Profilo</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    position: relative;
    margin-bottom: 0;
    height: 10vh;
}

a:hover {
    cursor: pointer;
    background-color: #d7e4f2;
}

a {
    border-radius: 8px;
}

#collapsibleNavId .router-link-active {
    color: #246de3;
    background-color: #d7e4f2;
}
</style>