/**
  Mutations  types
*/

const SET_USER_INFO = 'SET_USER_INFO'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
const UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR'

const state = {
  user: {}
}

const mutations = {
  [SET_USER_INFO] (state, user) {
    state.user = user
  },
  [UPDATE_USER_INFO] (state, vaule) {
    state.user[vaule] = vaule
  },
  [UPDATE_USER_AVATAR] (state, vaule) {
    state.user['avatar'] = vaule
  }

}

const actions = {
  setUser ({ commit }, user) {
    commit('SET_USER_INFO', user)
  },
  setAvatar ({ commit }, avatar) {
    commit('UPDATE_USER_AVATAR', avatar)
  }
}
const getters = {

    /**
     * obtém o valor de user do state
     * @param state
     * @returns {*}
     */
  user: (state) => {
    return state.user
  },
  username: (state) => {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
