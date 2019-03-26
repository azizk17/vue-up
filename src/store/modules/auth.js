/**
  Mutations  types
*/

const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_TOKEN = 'SET_TOKEN'
const REMOVE_TOKEN = 'REMOVE_TOKEN'
const UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR'
// const SET_MARKET = 'SET_MARKET'

const state = {
  token: null,
  user: {},
  authenticated: false
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
    state.authenticated = true
  },

  [REMOVE_USER] (state) {
    state.user = {}
    state.authenticated = false
  },

  [SET_TOKEN] (state, token) {
    state.token = token
  },

  [REMOVE_TOKEN] (state) {
    state.token = null
  },
  [UPDATE_USER_AVATAR] (state, vaule) {
    state.user.avatar = vaule
  }
  // [SET_MARKET] (state, rootState, vaule) {
  //   rootState.market = vaule
  // }
}

const actions = {
  setToken ({ commit }, token) {
    localStorage.setItem('jwt-token', token)
    commit('SET_TOKEN', token)
  },
  authHeader () {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    }

    return headers
  },
  setUser ({ commit }, user) {
        // let authUser = JSON.parse(user)
    localStorage.setItem('auth-user', user)
    commit('SET_USER', user)
    commit('market/SET_MARKET', user.market, {root: true})
  },
  remove ({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER')
    localStorage.removeItem('jwt-token')
    localStorage.clear()
  },
  setAvatar ({ commit }, vaule) {
    commit('UPDATE_USER_AVATAR', vaule)
  },
  setMarketLocation ({commit}, vaule) {
    // commit('SET_MARKET_LOCATION', vaule)
  }
}
const getters = {
  token: (state) => {
    return state.token
  },

    /**
     * obtém o valor de user do state
     * @param state
     */
  user: (state) => {
    return state.user
  },
    /**
        Check if authenticated
    */
  auth: (state) => {
    return state.authenticated
  },
    /**
     *       get auth authenticated username
     */
  username: (state) => {
    return state.user.username
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
