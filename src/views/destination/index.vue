<template>
  <div>
    目的地首页<br>
    <router-link :to="{ name: 'search', params: { keyword: 'h5' }}">search</router-link>
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log(this.$route.query)
    }
  }
</script>
