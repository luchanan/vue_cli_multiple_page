<template>
<div class="home">
  <div class="title">
    <div class="flex flex_h_center"><div>{{ path+$t("index.name") }}</div></div>
  </div>
</div>
</template>

<script>
import { i18n } from 'js/base'
export default {
  data: () => ({
    path: '当前位置：'
  }),
  mounted () {
    console.log(this.$t('index.name'))
  }
}
</script>

<style lang="scss" scoped>
  .title{
    .flex{
      display:flex;
      .flex_item{
        flex: 1;
      }
    }
  }
</style>
