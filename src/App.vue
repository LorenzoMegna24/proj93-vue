<script >
import FooterComp from './components/FooterComp.vue';
import HeaderComp from './components/HeaderComp.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    HeaderComp,
    FooterComp
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<template>
  <HeaderComp></HeaderComp>
  <router-view></router-view>
  <FooterComp></FooterComp>
</template>

<style lang="scss">
@use './style/main.scss'
</style>
