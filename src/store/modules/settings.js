
const EDIT_TITLE = 'EDIT_TITLE'

// initial state
// shape: [{ id, quantity }]
const state = {
  pageTitle: ''
}

// mutations
const mutations = {
  [EDIT_TITLE] (state, value) {
    state.pageTitle = value
  }
}
// actions
const actions = {
  setPageTitle ({ commit }, value) {
    commit('EDIT_TITLE', value)
  }
}
const getters = {
  pageTitle: (state) => {
    return state.pageTitle
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
