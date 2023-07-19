<script >
    import HeaderComp from './components/HeaderComp.vue';
    export default{
    data(){
      return{
        
      }
    },
    components:{
      HeaderComp
    },
    mounted(){

    },
    methods:{
     
    }
  }
</script>

<template>
    <HeaderComp></HeaderComp>
    <router-view></router-view>
</template>

<style lang="scss">
@use './style/main.scss'
</style>
