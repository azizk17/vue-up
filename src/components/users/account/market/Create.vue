<template>
  <page>
  <div slot="title">
    {{ title }}
  </div>
  <div slot="hed-right">
    <span class="text-dark" v-if="steps.step2" @click="prev()">السابق</span>
     <q-btn v-if="steps.step1" small round color="grey-4" icon="keyboard_arrow_right" @click="goBack()" class="no-shadow text-grey-6 no-padding no-margin"/> 
  </div>
  <div slot="hed-left">
  	<span v-if="steps.step1" class="text-dark" @click="next()">التالي</span>
    <q-btn v-if="steps.step2" round color="light-blue-3" icon="save" small   @click="onSubmit()"  :disable="gettingGeocode" class="no-shadow no-padding"/>
  </div>
  	<div slot="content"  :innerLoading="loading">
  		<!-- ################ map ############### -->
  		<div class="map-content" v-if="steps.step1">
  			<v-map ref="map" style="height: 100%" :zoom="zoom" :center="[currentLocation.latitude, currentLocation.longitude]" v-if="currentLocation" >
		        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
		        <v-marker :icon="icon" :lat-lng="[currentLocation.latitude, currentLocation.longitude]" draggable v-on:l-dragend="setnewLocation($event)"></v-marker>
		      </v-map>
		       <q-inner-loading :visible="loading">
		      <q-spinner-puff size="90px" color="primary"></q-spinner-puff>
		    </q-inner-loading>
  		</div>
  		<!-- ###################### form ################### -->
  		<div v-if="steps.step2">
  			<form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown="form.errors.clear($event.target.name)" >
    <!-- ############### market status ################### -->
     <q-item tag="label" class="text-right "  :class="{'bg-lime-5' : form.available}">
      <q-item-side>
            <q-toggle v-model="form.available" color="light-green-7" />
      </q-item-side>
        <q-item-main>
          <span class="text-dark" style="padding-right: 10px" v-if="form.available">مفتوح</span>
          <span class="text-dark" style="padding-right: 10px" v-if="!form.available">مغلق</span>
        </q-item-main>
        <q-item-side>
        </q-item-side>
      </q-item>
    <!-- ###############  market location  #################### -->
     <q-list link class="text-right bg-white" color="white">
      <q-list-header>عنوان المتجر</q-list-header>
      <q-item tag="label" class="text-right" @click="prev()" >
      <q-item-side>
        <q-icon name="location_searching" size="24px" />
      </q-item-side>
        <q-item-main>
         <span v-if="location">{{ location }}</span>
         <span v-if="!location">
         	<span v-if="!gettingGeocode">required</span>
         	<span v-if="gettingGeocode">loading</span>
         </span>
        </q-item-main>
        <q-item-side>
          <q-icon name="check" size="24px" color="green-4" v-if="location"/>
        </q-item-side>
      </q-item>

      <!-- <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="checked"></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>اخفاء عنوان المتجر</q-item-tile>
        </q-item-main>
      </q-item> -->
      <div v-if="$v.form.location.$error" class="q-field-error col text-negative ">
          <span v-if="!$v.form.location.required">العنوان مطلوب</span>
          
        </div>
    </q-list>
    
    <!-- ###############  paymeny methods #################### -->
     <q-list link class="text-right bg-white" color="white">
      <q-list-header>عمليات الدفع المقبوله</q-list-header>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="form.payment_cash" val="chash" disable></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>كاش</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="notYet" val="visa" disable></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>فيزا</q-item-tile>
          <q-item-tile sublabel>سوف يتم تفعيل هذه الخاصيه قريبا</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
     <!-- ###############  dilevery methods #################### -->
     <q-list link class="text-right bg-white" color="white">
      <q-list-header>طرق التسليم</q-list-header>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="form.pickup" val="pickup" disable></q-checkbox>
        </q-item-side>
        <q-item-main>

          <q-item-tile label>استلام من المتجر</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="notYet"  val="dilevery" disable></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>توصيل</q-item-tile>
          <q-item-tile sublabel>سوف يتم تفعيل هذه الخاصيه قريبا</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
   
   </form>
  		</div>
  		
       <q-inner-loading :visible="loading">
      <q-spinner-puff size="90px" color="primary"></q-spinner-puff>
    </q-inner-loading>
  	</div>
  </page>
</template>

<script>
import Form from '../../../../utils/Form.js'
// import authService from '../../services/authService'
import { required } from 'vuelidate/lib/validators'
import Vue2Leaflet from 'vue2-leaflet'
// import L from 'leaflet'
import Glyph from 'leaflet.icon.glyph'
import L from 'leaflet'
import { mapActions, mapGetters } from 'vuex'

import {QToolbar, QInnerLoading, QSpinnerPuff, QIcon, QBtn, QField, QInput, QItem, QItemSide, QItemMain, QItemTile, QCheckbox, QList, QListHeader, QDatetime, QOptionGroup, QRadio, QToggle, Dialog} from 'quasar'
export default {
  components: {'v-map': Vue2Leaflet.Map, 'v-tilelayer': Vue2Leaflet.TileLayer, 'v-marker': Vue2Leaflet.Marker, 'v-circle': Vue2Leaflet.LCircle, 'v-polygon': Vue2Leaflet.Polygon, QToolbar, QInnerLoading, QSpinnerPuff, QIcon, QBtn, QField, QInput, QItem, QItemSide, QItemMain, QItemTile, QCheckbox, QList, QListHeader, QDatetime, QOptionGroup, QRadio, QToggle},
  props: ['tempLocation'],
  data () {
    return {
      title: 'عنوان المتجر',
      loading: true,
      steps: {
        step1: true,
        step2: false
      },
      notYet: false,
      currentLocation: null,
      gettingGeocode: false,
      newLocation: null,
      center: [47.313220, -1.319482],
      zoom: 13,
      icon: L.icon({iconUrl: require('leaflet/dist/images/marker-icon.png')}),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '',
      form: new Form({
        location: {},
        locationVisible: false,
        payment_cash: true,
        pickup: true,
        available: true
      })
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user',
      getMarketLocation: 'market/getLocation'
    }),
    location () {
      if (this.form.location) {
        return this.form.location.full_address
      }
      return false
    }
  },
  validations: {
    form: {
      location: {required},
      pickup: {required},
      payment_cash: {required}
    }
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
      setMarket: 'market/setMarket'
    }),
    setnewLocation (e) {
      this.newLocation = e.target._latlng
      console.log(this.newLocation)
    },
    next () {
      this.steps.step1 = false
      this.steps.step2 = true
      this.gettingGeocode = true
      this.saveLocation()
    },
    prev () {
      this.steps.step1 = true
      this.steps.step2 = false
    },
    goBack () {
      let self = this
      Dialog.create({
        title: 'لم يتم حفظ التعديلات',
        message: 'عد للخلف على ايه حال',
        buttons: [
          'الغاء',
          {
            label: 'عد للخلف',
            handler () {
              self.$router.back()
            }
          }
        ]
      })
      // this.$router.back()
    },
    getCurrentLocation () {
      if (navigator.geolocation) {
        this.loading = true
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          self.currentLocation = location.coords
          self.newLocation = location.coords
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
        self.form.location = location
        self.gettingGeocode = false
      })
    },
    getLocationDetails () {
      let self = this
      // call google api to more info ie. city name
      // AIzaSyCMIdE6Xb2civhzpPZTeuvGzhWVEkHGOiY
      let userLocation = {}
      var geocoder
      geocoder = new window.google.maps.Geocoder()
      var latlng = new window.google.maps.LatLng(this.newLocation)
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
    },
    onSubmit () {
      let self = this
      console.log(this.form.location)
      this.$v.form.$touch()
      console.log(this.$v.form)
      if (this.$v.form.$error) {
        return false
      }
      console.log('hey')
      this.form.post(window.apiUrl + '/user/' + this.authUsername + '/market/create').then(function (res) {
        self.setMarket(res)
        self.form.submitting = false
        self.$router.back()
      }).catch(res => {
        self.form.submitting = false
        self.form.errors = res.error
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
