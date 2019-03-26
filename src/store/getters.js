const cartProducts = state => {
    return state.cart.added.map(({ id, quantity }) => {
        const product = state.products.all.find(p => p.id === id)
        return {
            title: product.title,
            price: product.price,
            quantity
        }
    })
}

const getUser = function() {
    return store.state.auth.user
}

const isLoggedIn = function() {
    return store.state.auth.authenticated
}

export default {
    isLoggedIn,
    getToken,
    getUser
}
