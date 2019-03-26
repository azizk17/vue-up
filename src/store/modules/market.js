import axios from 'axios'
const UPDATA_LOCATION = 'UPDATA_LOCATION'
const CLEAR_LOCATION = 'CLEAR_LOCATION'
const SET_MARKET = 'SET_MARKET'
const CLEAR_MARKET = 'CLEAR_MARKET'
const SET_STATUS = 'SET_STATUS'
const SET_TEMP_MARKET_LOCATION = 'SET_TEMP_MARKET_LOCATION'
const CLEAR_TEMP_MARKET_LOCATION = 'CLEAR_TEMP_MARKET_LOCATION'

// initial state
// shape: [{ id, quantity }]
const state = {
  market: {},
  tempLocation: {}
}

// mutations
const mutations = {
  [UPDATA_LOCATION] (state, value) {
    state.market.location = value
  },
  [CLEAR_LOCATION] (state) {
    state.market.location = null
  },
  [SET_MARKET] (state, value) {
    state.market = value
  },
  [CLEAR_MARKET] (state, value) {
    state.market = null
  },
  [SET_TEMP_MARKET_LOCATION] (state, value) {
    state.tempLocation = value
  },
  [CLEAR_TEMP_MARKET_LOCATION] (state, value) {
    state.tempLocation = null
  },
  [SET_STATUS] (state, user) {
    if (state.market) {
      state.market.available = !state.market.available
      let value = state.market.available
      axios.post(window.apiUrl + '/user/' + user.username + '/market/setStatus', {status: value}).then(function (res) {
        console.log(res)
      })
    }
  }
}
// actions
const actions = {
  setLocation ({ commit }, value) {
    commit('UPDATA_LOCATION', value)
  },
  clearLocation ({commit}) {
    commit('CLEAR_LOCATION')
  },
  setMarket ({ commit }, value) {
    commit('SET_MARKET', value)
  },
  clearMarket ({commit}) {
    commit('CLEAR_MARKET')
  },
  setStatus ({commit}, value) {
    commit('SET_STATUS', value)
  },
  setTempMarketLocation ({commit}, value) {
    commit('SET_TEMP_MARKET_LOCATION', value)
  },
  clearTempMarketLocation ({commit}) {
    commit('CLEAR_TEMP_MARKET_LOCATION')
  }
}
const getters = {
  hasMarket: (state) => {
    return state.market || false
  },
  getLocation: (state) => {
    if (getters.hasMarket) {
      console.log(state.market)
      return state.market.location
    }
  },
  getMarket: (state) => {
    if (getters.hasMarket) {
      return state.market
    }
  },
  getStatus: (state) => {
    if (getters.hasMarket) {
      return state.market.available
    }
  },
  getTempMarketLocation: (state) => {
    return state.tempLocation
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
