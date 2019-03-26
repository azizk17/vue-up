/**
  Handling route navigation and page info
*/

const SET_PAGE_INFO = 'SET_PAGE_INFO'
const SET_FROM_PAGE = 'SET_FROM_PAGE'
const SET_GO_BACK = 'SET_GO_BACK'

const state = {
  page: {},
  fromPage: {},
  goBackInfo: { // could be false to prevent going back and hid button
    canGoBack: false,
    path: '',
    replace: false
  }
}

const mutations = {
  [SET_PAGE_INFO] (state, page) {
    state.page = page
  },
  [SET_FROM_PAGE] (state, page) {
    state.fromPage = page
  },
  [SET_GO_BACK] (state, goBack) {
    state.goBackPath = goBack
  }

}

const actions = {
  setPage ({ commit }, page) {
    commit('SET_PAGE_INFO', page)
  },
  setFromPage ({ commit }, page) {
    commit('SET_FROM_PAGE', page)
  },
  setGoBack ({ commit }, goBack) {
    commit('SET_GO_BACK', goBack)
  }
}
const getters = {
  page: (state) => {
    return state.page
  },
  fromPage: (state) => {
    return state.fromPage
  },
  goBack: (state) => {
    return state.goBackPath
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
