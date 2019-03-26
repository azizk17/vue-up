/**
 *
 */
// import routes from './routes'
import authService from './services/authService'
import { Dialog } from 'quasar'
import store from './store/store'

export default function routerConfig (router) {
  router.beforeEach((to, from, next) => {
    let token = null
    if (!authService.isLoggedIn()) {
      token = localStorage.getItem('jwt-token')
    }
    if (token !== null && !authService.isLoggedIn()) {
      console.log(' hey im here ')
      authService.setToken(token)
      authService.getUserProfile(token)
                .then(function (res) {
                  if (res.error) {
                    // inform the user of a problem
                    Dialog.create({
                      title: 'خطا',
                      message: 'حدث خطا،',
                      buttons: [
                        'close'
                      ]
                    })
                    authService.remove()
                    next('login')
                    return false
                  }
                  authService.setUser(res)
                  // need promise to insure user is directed after getting the data from server
                  next()
                }).catch(function (res) {
                  console.log('error: route', res)
                  authService.remove()
                  next('login')
                        // to.redirect(LOGIN_URL)
                })
    }
    else if (to.meta.auth && !authService.isLoggedIn()) {
            // to.redirect(LOGIN_URL)
      next('login')
    }
    else if (to.meta.guest && authService.isLoggedIn()) {
            // to.redirect(to.from.path)
      next('/')
    }
    else if (to.meta.hasMarket && !store.state.market.market) {
      next({
        name: 'user.create.market',
        params: {username: store.state.auth.user.username}
      })
    }
    else if (to.meta.hasNoMarket && store.state.market.market) {
      next({
        name: 'user.edit.market.settings',
        params: {username: store.state.auth.user.username}
      })
    }
    else {
      next()
    }
  })
}
