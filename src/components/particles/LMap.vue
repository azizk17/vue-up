<template>
  	<q-modal ref="modal" maximized>
  		<q-modal-layout>
  	<div class="map-content">
  	<v-map class="lmap"  :zoom="zoom" :center="[owner.market.location.lat, owner.market.location.lng]" v-if="owner">
        <v-tilelayer :url="url" :attribution="attribution" ></v-tilelayer>
        <v-marker  :icon="icon" :lat-lng="[owner.market.location.lat, owner.market.location.lng]" ></v-marker>
      </v-map>
     </div>
 </q-modal-layout>
</q-modal>
</template>

<script>
// import Glyph from 'leaflet.icon.glyph'
import L from 'leaflet'
import Vue2Leaflet from 'vue2-leaflet'
import {QModal, QModalLayout} from 'quasar'

export default {
  props: ['owner'],
  components: {'v-map': Vue2Leaflet.Map, 'v-tilelayer': Vue2Leaflet.TileLayer, 'v-marker': Vue2Leaflet.Marker, 'v-circle': Vue2Leaflet.LCircle, 'v-polygon': Vue2Leaflet.Polygon, QModal, QModalLayout},
  data () {
    return {
      zoom: 13,
      icon: L.icon({iconUrl: require('leaflet/dist/images/marker-icon.png')}),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  watch: {

  },
  methods: {
    open () {
      this.$refs.modal.open()
    }
  }
}
</script>

<style lang="css" scoped>
@import "~leaflet/dist/leaflet.css";
.map-content {
	height: 100%;
	width: 100%;
}

</style>
