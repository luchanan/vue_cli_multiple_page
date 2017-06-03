import { Vue, VueRouter } from 'js/base'
import Index from './index.vue'
import Search from './search.vue'

const router = new VueRouter({
  // base: '/destination',
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      name: 'search',
      path: '/search/:keyword',
      component: Search
    },
    {
      path: '*',
      redirect: '/' // 输入其他不存在的地址自动跳回首页
    }
  ]
})

new Vue({
  router
}).$mount('#app')
