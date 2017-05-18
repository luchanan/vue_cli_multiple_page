// require('scss/common.scss')
import 'scss/common.scss'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import zhCN from 'assets/locales/zh_CN.json'
const language = 'zh_CN'
Vue.use(VueI18n)
Vue.use(VueRouter)
const locales = {
  [language]: zhCN
}
const i18n = new VueI18n({
  locale: language,
  messages: locales
})
export {
  Vue, i18n, VueRouter
}
