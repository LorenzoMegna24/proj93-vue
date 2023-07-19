<script >
  import axios from 'axios';

  export default{
    name: 'HeaderComp',
    data(){
        return{

        }
    }
  }
</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container">
            <RouterLink class="navbar-brand" :to="{name:'home'}">Navbar</RouterLink>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" :to="{name:'home'}" aria-current="page">Home <span class="visually-hidden">(current)</span></RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{name:'apartment'}">Appartamenti</RouterLink>
                    </li>
                </ul>
                <form class="d-flex my-2 my-lg-0">
                    <input class="form-control me-sm-2" type="text" placeholder="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <a class="nav-link active ms-2" href="http://127.0.0.1:8000/register" aria-current="page">Registrati<span class="visually-hidden">(current)</span></a>
                <a class="nav-link active ms-2" href="http://127.0.0.1:8000/login" aria-current="page">Accedi <span class="visually-hidden">(current)</span></a>
            </div>
      </div>
    </nav>
    
</template>

<style lang="scss" scoped>

</style>