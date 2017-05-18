import { Vue, VueRouter } from 'js/base'
import Index from './index.vue'
import Collect from './collect.vue'

// 模块/功能 router配置
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/collect',
      component: Collect
    }
  ]
})

new Vue({
  router
}).$mount('#app')
