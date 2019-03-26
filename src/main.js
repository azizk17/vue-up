// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// require('quasar/dist/quasar.' + __THEME + '.rtl.css')
require(`./themes/app.${__THEME}.styl`)
require('../node_modules/leaflet/dist/leaflet.css')
// ==============================
require('./bootstrap')

import Vue from 'vue'
import Quasar from 'quasar'
import 'quasar-extras/material-icons'
import 'quasar-extras/animate'

import moment from 'moment'
import store from './store/store'
import router from './router'
// import settings from './settings'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

if (DEV) {
  window.apiUrl = 'http://127.0.0.1:8000/_k'
}
if (PROD) {
  window.apiUrl = 'http://api.reezg.net/_k'
}

Vue.use(VueI18n)
Vue.use(Vuelidate)

var i18n = new VueI18n({
  locale: 'en',
  messages: {test: 'test'}
})
// import global compomnent from quasar
// Install Quasar Framework
Vue.use(Quasar)
moment.locale('ar')
Vue.prototype.moment = moment

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    i18n: i18n,
    created: function () {
      // settings.setLang('ar')
    },
    render: h => h(require('./App'))
  })
})
