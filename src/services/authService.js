import store from '../store/store'
import axios from 'axios'

const grantPassword = function (data) {
  return {
    username: data.username,
    password: data.password,
    grant_type: 'password',
    client_id: 3,
    client_secret: 'td8qXG1tyN4PZVvcgAbYO9WS06Zaszi5tcS1KcyG',
    scope: '*'
  }
}
const getUserProfile = function (token) {
  let headers = {'Authorization': 'Bearer ' + token}
  return axios.get(window.apiUrl + '/user/auth', { headers: headers }).then(function (response) {
    let authUser = response.data
    if (authUser !== null || authUser !== undefined) {
      return authUser
    }
  }).catch(error => {
    return {error: error.response.status}
  })
}

const login = function (data) {
  let appAuthentication = {
    id: 0,
    secret: ''
  }
  if (DEV) {
    appAuthentication.id = 1
    appAuthentication.secret = '5RPqEtG71owBMmSMUyUWBciGacHobc88IcexX6lB'
  }
  if (PROD) {
    appAuthentication.id = 1
    appAuthentication.secret = 'kcPmHbfcJJDfCWEYwQlB6rSDtqMt9GNNGe2krgFL'
  }
  let loginData = {
    username: data.username,
    password: data.password,
    grant_type: 'password',
    client_id: appAuthentication.id,
    client_secret: appAuthentication.secret,
    scope: '*'
  }
  return new Promise((resolve, reject) => {
    axios.post(window.apiUrl + '/oauth/token', loginData).then(function (res) {
      let token = res.data.access_token
      console.log(token)
      if (token !== undefined || token !== null) {
        setToken(token)
        setHeader()
        resolve(token)
      }
    }).catch((error) => {
      // handel getting token errors - server response
      // if username || password incorrect
      reject(error.response)
    })
  })
}

const logout = function () {
  return new Promise((resolve, reject) => {
    store.dispatch('auth/remove')
    localStorage.removeItem('jwt-token')
    this.removeHeader()
    resolve()
  })
}
const setHeader = function () {
  let token = localStorage.getItem('jwt-token')
  window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token
  }
}
const removeHeader = function () {
  window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + null
  }
}

const setToken = function (token) {
  store.dispatch('auth/setToken', token)
  localStorage.setItem('jwt-token', token)
}

const setUser = function (user) {
  store.dispatch('auth/setUser', user)
  return true
}

const set = function (type, value) {
  switch (type) {
    case 'token':
      setToken(value)
      break
    case 'user':
      setUser(value)
      break
  }
}

const remove = function () {
  store.dispatch('auth/remove')
  localStorage.removeItem('jwt-token')
}

const getToken = function () {
  return store.state.auth.token
}

const getUser = function () {
  return store.state.auth.user
}

const isLoggedIn = function () {
    /**
        check first in the state
        if not dound check the localstorage
    */

  return store.state.auth.authenticated
}

export default {
  grantPassword,
  getUserProfile,
  login,
  logout,
  setHeader,
  removeHeader,
  set,
  remove,
  isLoggedIn,
  setToken,
  setUser,
  getToken,
  getUser
}
