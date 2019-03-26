/**
  Mutations  types
*/
const SET_LOCATION = 'SET_LOCATION'

const state = {
  location: {}
}
const mutations = {
  [SET_LOCATION] (state, value) {
    state.location = value
  }
}

const actions = {
  setCurrentLocation ({ commit }, value) {
    commit('SET_LOCATION', value)
  }
}
const getters = {

  getCurrentLocation: (state) => {
    return state.location
  },
  getLat: (state) => {
    return state.location.latitude
  },
  getLng: (state) => {
    return state.location.longitude
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
