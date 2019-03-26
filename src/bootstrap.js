/**
*
* Load dependencies and bootstrap app
*
*
*/
import Vue from 'vue'
import axios from 'axios'
import VueProgressiveImage from 'vue-progressive-image'
import VueCroppie from 'vue-croppie'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
Vue.use(VueAwesomeSwiper)

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyCMIdE6Xb2civhzpPZTeuvGzhWVEkHGOiY',
    libraries: ['places'],
    language: 'ar'
  }
})
Vue.use(VueCroppie)
// mount with global
// vue use
Vue.use(axios)
window.axios = axios
Vue.use(VueProgressiveImage)

window.axios.defaults.headers.common = {
  // 'X-Requested-With': 'XMLHttpRequest',
  // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
  'Accept': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
}

// pusher with laravel echo
import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')
window.Echo = new Echo({
  broadcaster: 'pusher',
  authEndpoint: window.apiUrl + '/broadcasting/auth',
  auth: {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
    }
  },
  key: 'c2b0d3cf2f82ec9d0283',
  cluster: 'ap2',
  encrypted: true
})

// global commponents
import Test from './components/Test'
import AppHeader from './components/layouts/particles/AppHeader'
import AppFooter from './components/layouts/particles/AppFooter'
import AddPost from './components/posts/AddPost'
import Comments from './components/posts/Comments'
import UserProfile from './components/users/profile/Index'
import Page from './components/layouts/Page'
import RightMenu from './components/layouts/particles/RightMenu'
import PostItem from './components/posts/PostItem'
import Avatar from './components/particles/Avatar'
import Cart from './components/cart/Index'

import {QLayout, QToolbar, QToolbarTitle, QModal, QTabs} from 'quasar'
Vue.component('q-layout', QLayout)
Vue.component('q-toolbar', QToolbar)
Vue.component('q-toolbar-title', QToolbarTitle)
Vue.component('q-modal', QModal)
Vue.component('q-tabs', QTabs)

Vue.component('test', Test)
Vue.component('app-header', AppHeader)
Vue.component('app-footer', AppFooter)
Vue.component('add-post', AddPost)
Vue.component('user-profile', UserProfile)
Vue.component('comments', Comments)
Vue.component('page', Page)
Vue.component('right-menu', RightMenu)
Vue.component('post-item', PostItem)
Vue.component('avatar', Avatar)
Vue.component('cart', Cart)

Vue.directive('avatar', function (el, binding) {
  console.log(binding)
  let src = binding.value.src === '' ? 'assets/avatar.png' : binding.value.src
  // if (binding.src === '') {
  el.src = src
  // }
  console.log(src)
})
