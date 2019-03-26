<template>
  <page>
  <div slot="title">
    {{ title }}
  </div>
  <div slot="hed-right">
    <q-btn color="primary" v-if="newLocation">g</q-btn>
  </div>
  <div slot="hed-left">
    <q-btn  round color="light-blue-3" icon="save" small   @click="saveLocation()"  :disable="!currentLocation" class="no-shadow no-padding"/>
  </div>
  	<div slot="content" class="map-content" :innerLoading="loading">

  		<v-map ref="map" style="height: 100%" :zoom="zoom" :center="[currentLocation.latitude, currentLocation.longitude]" v-if="currentLocation">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :icon="icon" :lat-lng="[currentLocation.latitude, currentLocation.longitude]" draggable></v-marker>
      </v-map>
       <q-inner-loading :visible="loading">
      <q-spinner-puff size="90px" color="primary"></q-spinner-puff>
    </q-inner-loading>
  	</div>
  </page>
</template>

<script>
import axios from 'axios'
import Vue2Leaflet from 'vue2-leaflet'
// import L from 'leaflet'
import Glyph from 'leaflet.icon.glyph'
import L from 'leaflet'
import { mapActions, mapGetters } from 'vuex'

import {QToolbar, QInnerLoading, QSpinnerPuff, QBtn} from 'quasar'
export default {
  components: {'v-map': Vue2Leaflet.Map, 'v-tilelayer': Vue2Leaflet.TileLayer, 'v-marker': Vue2Leaflet.Marker, 'v-circle': Vue2Leaflet.LCircle, 'v-polygon': Vue2Leaflet.Polygon, QToolbar, QInnerLoading, QSpinnerPuff, QBtn},
  props: ['tempLocation'],
  data () {
    return {
      title: 'عنوان المتجر',
      loading: true,
      currentLocation: null,
      newLocation: null,
      center: [47.313220, -1.319482],
      zoom: 13,
      icon: L.icon({iconUrl: require('leaflet/dist/images/marker-icon.png')}),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: ''
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user',
      getMarketLocation: 'market/getLocation'
    })
  },
  mounted () {
    this.getCurrentLocation()
    console.log(Glyph)
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    ...mapActions({
      setTempMarketLocation: 'market/setTempMarketLocation'
    }),
    getCurrentLocation () {
      if (navigator.geolocation) {
        this.loading = true
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          self.currentLocation = location.coords
          self.loading = false
        })
      }
      else {
        alert('نرجوا تفعيل تحديد المواقع')
      }
    },
    saveLocation () {
      let self = this
      // get info from google api then save it to market location
      this.getLocationDetails().then((location) => {
        self.setTempMarketLocation(location)
        self.$router.back()
      })
    },
    setLocation (location) {
      console.log(location)
      // this.setMarketLocation(location)
    },
    getLocationDetails () {
      let self = this
      // call google api to more info ie. city name
      // AIzaSyCMIdE6Xb2civhzpPZTeuvGzhWVEkHGOiY
      let userLocation = {}
      var geocoder
      geocoder = new window.google.maps.Geocoder()
      var latlng = new window.google.maps.LatLng(this.currentLocation.latitude, this.currentLocation.longitude)
      /*eslint-disable */
      return new Promise((resolve, reject) => {
        geocoder.geocode({'latLng': latlng, 'language': 'ar'}, function (results, status) {
         if (status == window.google.maps.GeocoderStatus.OK) {
           let address = results[0].address_components
           for (let i = 0; i < address.length; i++) {
             var types = address[i].types
             // get country
             if (types == 'country,political') {
               userLocation.country = address[i].long_name
             }
             // get city
             if (types == 'locality,political') {
               userLocation.city = address[i].long_name
             }
             // get postal code postal_code
             if (types == 'postal_code_suffix') {
               userLocation.postal_code_suffix = address[i].long_name
             }
             // get postal code postal_code
             if (types == 'postal_code') {
               userLocation.postal_code = address[i].long_name
            }
          }
          userLocation.full_address = results[0].formatted_address
          userLocation.lat = self.currentLocation.latitude
          userLocation.lng = self.currentLocation.longitude
          resolve(userLocation)
         }
         else {
          alert('someting went wrong, please try later')
          reject()
         }
      })
     })
     /*eslint-enable */

      // let userLocation = {}
      // // create new instance form this request
      // // Remove any existing default Authorization headers
      // if (axios.defaults.headers.common.Authorization) { delete axios.defaults.headers.common.Authorization }
      // if (axios.defaults.headers.Authorization) { delete axios.defaults.headers.Authorization }
      // // if (axios.defaults.headers.common['X-Requested-With']) { delete axios.defaults.headers.common['X-Requested-With'] }
      // let path = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.currentLocation.latitude + ',' + this.currentLocation.longitude + '&key=AIzaSyCMIdE6Xb2civhzpPZTeuvGzhWVEkHGOiY&language=en'
      // axios.get(path).then(function (res) {
      //   if (res.status === 200) {
      //     var data = res.data
      //     var addressComponents = data.results[0].address_components
      //     for (let i = 0; i < addressComponents.length; i++) {
      //       var types = addressComponents[i].types
      //       // get country
      //       /*eslint-disable */
      //       if (types == 'country,political') {
      //         userLocation.country = addressComponents[i].long_name
      //       }
      //       // get city
      //       if (types == 'locality,political') {
      //         userLocation.city = addressComponents[i].long_name
      //       }
      //       // get postal code postal_code
      //       if (types == 'postal_code_suffix') {
      //         userLocation.postal_code_suffix = addressComponents[i].long_name
      //       }
      //       // get postal code postal_code
      //       if (types == 'postal_code') {
      //         userLocation.postal_code = addressComponents[i].long_name
      //       }
      //       /*eslint-enable */
      //     }
      //     userLocation.full_address = data.results[0].formatted_address
      //     userLocation.lat = self.currentLocation.latitude
      //     userLocation.lng = self.currentLocation.longitude
      //     self.onSubmit(userLocation)
      //   }
      //   if (res.status !== 200) {
      //     alert('someting went wrong, please try later')
      //   }
      // })
      // // add back auth
      // window.axios.defaults.headers.common = {
      //   'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      // }
    },
    onSubmit (location) {
      window.axios.defaults.headers.common = {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
      console.log(location)
      let path = window.apiUrl + '/user/' + this.authUsername + '/market/updateLocation'
      axios.post(path, {location: location}).then(function (res) {
        // body...
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style scoped>
.map-content{ 
	    position: absolute;
    height: 100%;
    text-align: center;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>
