
import axios from 'axios'
const SET_ADDED = 'SET_ADDED'
const ADD_TO_CART = 'ADD_TO_CART'
const UP_QUANTITY = 'ADD_QUANTITY'
const DOWN_QUANTITY = 'DOWN_QUANTITY'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const ADD_MESSAGE = 'ADD_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'

const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'

const UPDATE_MARKET_STATUS = 'UPDATE_MARKET_STATUS'
// initial state
// shape: [{ id, quantity, rxx }]
const state = {
  added: [],
  lastCheckout: null
}

// mutations
const mutations = {
  [SET_ADDED] (state, items) {
    state.added = items
  },
  [ADD_TO_CART] (state, product) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === product.id)
    if (!record) {
      state.added.push({
        product: product,
        quantity: 1,
        messages: []
      })
    }
    else {
      record.quantity++
    }
  },
  [REMOVE_FROM_CART] (state, product) {
    const record = state.added.find(p => p.product.id === product.id)
    if (record) {
      let index = state.added.indexOf(record)
      state.added.splice(index, 1)
    }
  },
  [UP_QUANTITY] (state, product) {
    const record = state.added.find(p => p.product.id === product.id)
    record.quantity++
    actions.sendUpadateToServer(record)
  },
  [DOWN_QUANTITY] (state, product) {
    const record = state.added.find(p => p.product.id === product.id)
    if (record.quantity === 1) {
      return
    }
    record.quantity--
    actions.sendUpadateToServer(record)
  },
  [CHECKOUT_REQUEST] (state) {
        // clear cart
    state.added = []
    state.lastCheckout = null
  },

  [CHECKOUT_SUCCESS] (state) {
    state.lastCheckout = 'successful'
  },

  [CHECKOUT_FAILURE] (state, savedCartItems) {
        // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.lastCheckout = 'failed'
  },
  [ADD_MESSAGE] (state, obj) {
    // obj - has item and message
    console.log(state.added)
    const record = state.added.find(p => p.product.id === obj.item.product.id)
    record.messages.push(obj.message)
    actions.sendUpadateToServer(record)
  },
  [DELETE_MESSAGE] (state, obj) {
    const record = state.added.find(p => p.product.id === obj.item.product.id)
    record.messages = record.messages.filter(msg => msg !== obj.message)
    actions.sendUpadateToServer(record)
  },
  [UPDATE_MARKET_STATUS] (state, item) {
    state.added.map(function (val) {
      if (val.product.user.market.id === item.market.id) {
        val.product.user.market = item.market
      }
    })
  }
}
// actions
const actions = {
  setCartItems ({commit}, items) {
    commit(SET_ADDED, items)
  },
  addToCart ({ commit, rootState }, product) {
    // if (product.inventory > 0) {
    //   commit(ADD_TO_CART, product)
    // }
    if (rootState.auth.authenticated) {
      if (product.user.id === rootState.auth.user.id) {
        return
      }
    }
    commit(ADD_TO_CART, product)
    // check for user is looged in
    // if so, perssist else die
    if (rootState.auth.authenticated) {
      let record = state.added.find(p => p.product.id === product.id)
      let data = {quantity: record.quantity}
      let path = window.apiUrl + '/cart/' + record.product.id + '/add'
      axios.post(path, data).then(function (res) {
       // everythind is good, do nothing
      }).catch(error => {
        // remove from cart and inform reason
        if (error) {}
      })
    }
  },
  removeFromCart ({commit, rootState}, product) {
    commit(REMOVE_FROM_CART, product)
    // check for user is looged in
    // if so, perssist else die
    if (rootState.auth.authenticated) {
      let path = window.apiUrl + '/cart/' + product.id + '/remove'
      axios.post(path).then(function (res) {
       // everythind is good, do nothing
      }).catch(error => {
        if (error) {}
      })
    }
  },
  emptyCart ({commit}) {
    commit(CHECKOUT_REQUEST)
    commit(CHECKOUT_SUCCESS)
  },
  upQuantity ({commit, rootState}, product) {
    commit(UP_QUANTITY, product)
  },
  downQuantity ({commit, rootState}, product) {
    commit(DOWN_QUANTITY, product)
  },
  addMessage ({commit}, item, messages) {
    commit(ADD_MESSAGE, item, messages)
  },
  deleteMessage ({commit}, item) {
    commit(DELETE_MESSAGE, item)
  },
  updateMarketStatus ({commit}, market) {
    commit(UPDATE_MARKET_STATUS, market)
  },
  sendUpadateToServer (item) {
    const record = state.added.find(p => p.product.id === item.product.id)
    const path = window.apiUrl + '/cart/' + record.product.id + '/update'
    axios.post(path, record).then(function (res) {
      console.log('updated item', res)
    })
  }
  // checkout ({ dispatch, state }, products) {
  //   const savedCartItems = [...state.cart.added]
  //   dispatch(CHECKOUT_REQUEST)
  //   shop.buyProducts(
  //           products,
  //           () => dispatch(CHECKOUT_SUCCESS),
  //           () => dispatch(CHECKOUT_FAILURE, savedCartItems)
  //       )
  // }
}
const getters = {
  cartProducts: (state) => {
    return state.added.map(({ product, quantity, messages }) => {
      return {
        product: product,
        quantity: quantity,
        messages: messages
      }
    })
  },
  isAdded: (state, getters) => (product) => {
    return state.added.find(p => p.product.id === product.id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
