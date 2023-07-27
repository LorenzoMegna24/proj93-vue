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
    <nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light shadow">
        <div class="container">
            <RouterLink class="navbar-brand px-2" :to="{ name: 'home' }">Navbar</RouterLink>
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
                        <RouterLink class="nav-link" :to="{ name: 'apartments' }">Ricerca Avanzata</RouterLink>
                    </li>
                </ul>

                <a class="nav-link active ms-2 p-2" href="http://127.0.0.1:8000/register" aria-current="page">Registrati<span
                        class="visually-hidden">(current)</span></a>
                <a class="nav-link active ms-2 p-2" href="http://127.0.0.1:8000/login" aria-current="page">Accedi <span
                        class="visually-hidden">(current)</span></a>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    
    a:hover{
        cursor: pointer;
        background-color: #d7e4f2;
    }

    a{
        border-radius: 8px;
    }

    #collapsibleNavId .router-link-active{
        color: #246de3;
        background-color: #d7e4f2;
    }
</style>