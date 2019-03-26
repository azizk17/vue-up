
const SET_POST = 'SET_POST'
const CLEAR_POST = 'CLEAR_POST'

// initial state
// shape: [{ id, quantity }]
const state = {
  posts: {}
}

// mutations
const mutations = {
  [SET_POST] (state, value) {
    state.market.location = value
  },
  [CLEAR_POST] (state) {
    state.market.location = null
  }
}
// actions
const actions = {
  setPost ({ commit }, value) {
    commit('UPDATA_LOCATION', value)
  },
  clearPost ({commit}) {
    commit('CLEAR_LOCATION')
  }
}
const getters = {
  getPost: (state) => {
    return state.market.location
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
