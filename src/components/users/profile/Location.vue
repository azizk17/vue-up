<template>
<page :noPadding="true">
  <div slot="title">
    {{owner}}@
  </div>
<div slot="content">
<div class="content" v-if="owner">
	<v-map style="height: 100%" :zoom="zoom" :center="[location.lat, location.lng]">
        <v-tilelayer :url="url" ></v-tilelayer>
        <v-marker :lat-lng="[location.lat, location.lng]" :icon="iconOwner"></v-marker>
        <v-marker :lat-lng="[getLat, getLng]" :icon="iconUser"></v-marker>
      </v-map>
</div>
	
</div>
	 

</page>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import Glyph from 'leaflet.icon.glyph'
import L from 'leaflet'
import {mapGetters} from 'vuex'
import { QModal, QModalLayout, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemMain, QItemSide } from 'quasar'

export default {
  components: {QModal, QModalLayout, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemMain, QItemSide, 'v-map': Vue2Leaflet.Map, 'v-tilelayer': Vue2Leaflet.TileLayer, 'v-marker': Vue2Leaflet.Marker, 'v-circle': Vue2Leaflet.LCircle, 'v-polygon': Vue2Leaflet.Polygon},
  data () {
    return {
      owner: null,
      location: {},
      userLocation: {},
      zoom: 15,
      center: [47.313220, -1.319482],
      marker: L.latLng(47.413220, -1.219482),
      iconOwner: L.icon({iconUrl: require('leaflet/dist/images/marker-icon.png')}),
      iconUser: L.divIcon({className: 'user-location-icon'}),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
  },
  computed: {
    ...mapGetters({
      getLocation: 'client/getCurrentLocation',
      getLat: 'client/getLat',
      getLng: 'client/getLng'
    })
  },
  watch: {
    '$route' (to, from) {
      this.getData()
    }
  },
  methods: {
    goBack: function () {
      this.$router.replace({ name: 'user.profile', params: {username: this.$route.params.username} })
      console.log(Glyph)
    },
    test () {
      console.log(this.$route.query.lat)
    },
    getData () {
      this.owner = this.$route.query.owner
      if (this.owner) {
        this.location.lat = this.$route.query.lat
        this.location.lng = this.$route.query.lng
      }
    }
  },
  mounted: function () {
    this.getData()
  }
}
</script>

<style lang="scss" >
.content{ 
	position: relative;
	height: 90vh;
}
.user-location-icon {
  background: #00adf7;
  width: 15px !important;
  height: 15px !important;
  border-radius: 180px;
  border: 2px solid #fff;
}
</style>
