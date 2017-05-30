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
    }
  ]
})

new Vue({
  router
}).$mount('#app')
