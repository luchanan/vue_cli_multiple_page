<template>
  <div>
    search url?参数： {{msg}}
  </div>
</template>

<script>
  export default {
    data: () => ({
      msg: ''
    }),
    mounted () {
      this.msg = this.$route.params
    }
  }
</script>
