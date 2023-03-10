<template>
  <div>
    <HomeNav/>
    <router-view/>
  </div>
  
</template>

<script>

import HomeNav from '@/components/HomeNav.vue'

export default {
  components: {
    HomeNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
