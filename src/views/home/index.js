import { Vue, i18n } from 'js/base'
import App from './index.vue'
import './scss/home.scss'
new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
