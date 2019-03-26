const ADD_TO_CART = 'ADD_TO_CART'
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

// initial state
const state = {
  all: []
}

// mutations
const mutations = {
  [RECEIVE_PRODUCTS] (state, products) {
    state.all = products
  },

  [ADD_TO_CART] (state, productId) {
    state.all.find(p => p.id === productId).inventory--
  }
}
const actions = {
   getAllProducts = ({ dispatch }) => {
    shop.getProducts(products => {
        dispatch(types.RECEIVE_PRODUCTS, products)
    })
}
}

export default {
  state,
  mutations
}
