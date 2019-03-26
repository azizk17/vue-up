// import shop from '../api/shop'
// import * as types from './mutation-types'

// const addToCart = ({ dispatch }, product) => {
//     if (product.inventory > 0) {
//         dispatch(types.ADD_TO_CART, product.id)
//     }
// }

// const checkout = ({ dispatch, state }, products) => {
//     const savedCartItems = [...state.cart.added]
//     dispatch(types.CHECKOUT_REQUEST)
//     shop.buyProducts(
//         products,
//         () => dispatch(types.CHECKOUT_SUCCESS),
//         () => dispatch(types.CHECKOUT_FAILURE, savedCartItems)
//     )
// }

// const getAllProducts = ({ dispatch }) => {
//     shop.getProducts(products => {
//         dispatch(types.RECEIVE_PRODUCTS, products)
//     })
// }


// /**
//     AUTH 
// */
// const setToken = function(token) {
//     localStorage.setItem('jwt-token', token)
//     store.dispatch('SET_TOKEN', token)

// }

// const setUser = function(user) {
//     store.dispatch('SET_USER', user)
// }

// const set = function(type, value) {
//     switch (type) {
//         case 'token':
//             setToken(value)
//             break
//         case 'user':
//             setUser(value)
//             break
//     }
// }

// const remove = function() {
//     localStorage.removeItem('jwt-token')
//     store.dispatch('REMOVE_TOKEN')
//     store.dispatch('REMOVE_USER')
// }

// const getToken = function() {
//     return store.state.auth.token
// }

// const getUser = function() {
//     return store.state.auth.user
// }

// const isLoggedIn = function() {
//     return store.state.auth.authenticated
// }

// export default {

//     remove,
//     isLoggedIn,
//     setToken,
//     setUser,
//     getToken,
//     getUser
// }
