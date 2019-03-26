import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import cart from './modules/cart'
import page from './modules/page'
import market from './modules/market'
import client from './modules/client'

Vue.config.debug = true
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    page,
    user,
    cart,
    market,
    client
  },

  strict: debug

})
