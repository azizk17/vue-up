<template>
  <q-layout  ref="layout" 
  view="lHr lpr lFf"
  :header-style="{'border-radius': '0px 0px 25px 25px', 'box-shadow': 'none', 'opacity': 0.9,}"
  :right-style="{'border-radius': '25px 0px 0px 25px'}"
  class="bg-primary"
  >
 
  <q-toolbar id="top" slot="header" class="no-shadow text-center text-primary " color="grey-2" style="border-radius: 0px 0px 25px 25px; border-bottom: 1px solid #fff">
  <slot name="hed-right">
    <q-btn small round color="grey-4" icon="keyboard_arrow_right" @click="goBack()" v-show="canGoBack" class="no-shadow text-grey-6 no-padding no-margin"/> 
  </slot>
 <!-- ############## title  - slot -->
    <q-toolbar-title :padding="1" >
<!--       <span @click="test()">erfgerger</span>
 -->        <span class="logo-text text-droid-sans"> 
          <slot name="title">
            <span style="font-size: 44px; transition: font-size 1s;">رزق</span>
          </slot>
        </span>
    </q-toolbar-title>
     <slot name="hed-left">
       
     </slot>
  </q-toolbar>
  <div slot="left">
      <slot name="menu"></slot>
  </div>

  <div slot="right">
      <cart></cart>
  </div>

<!-- ########## content - slot  -->
  <div  :class="[noPadding ? 'no-padding' : 'layout-padding']" class="bg-primary" >
      <slot name="content"></slot>
  </div>

 
  </q-layout>
</template>

<script>
/*
 * Root component
 */
import {mapGetters, mapActions} from 'vuex'
import {QTransition, QLayout, QIcon, QBtn, QToolbar, QToolbarTitle, QFixedPosition, QSideLink, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QScrollArea, QToggle, Dialog, TouchPan} from 'quasar'
import GeoLocation from '../../utils/GeoLocation'
export default {
  components: {QTransition, QLayout, QIcon, QBtn, QToolbar, QToolbarTitle, QFixedPosition, QSideLink, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QScrollArea, QToggle},
  props: {noPadding: Boolean},
  directives: {TouchPan},
  data () {
    return {
      title: '',
      unSaved: false,
      canGoBack: true,
      cartShow: true,
      storeStatuts: true,
      position: {},
      transition: {
        enter: 'fadeIn',
        leave: 'fadeOut',
        duration: 90
      }
    }
  },
  computed: {
    ...mapGetters({
      posts: 'cart/cartProducts',
      user: 'auth/user',
      getMarket: 'market/getOptions',
      getLocation: 'client/getCurrentLocation'
    })
    // title: function (value) {
    //   return value
    // }
  },
  watch: {
    position (value) {
    }
  },
  mounted () {
    let self = this
    this.$bus.$on('page:unSaved', function (val) {
      self.unSaved = val
    })
    this.getCurrentLocation()
  },
  methods: {
    ...mapActions({
      setCurrentLocation: 'client/setCurrentLocation'
    }),
    swipePage (obj) {
      let self = this
      if (obj.direction === 'left') {
        return
      }
      console.log(this)
      // elemnet to be controlled
      let ele = this.$el

      if (obj.direction === 'right') {
        //  making sure left is 0
        ele.style.left = obj.distance.x + 'px'
        if (obj.isFinal && obj.distance.x > 225) {
          ele.style.left = 0
          self.toggleCart(self.item)
        }
      }
      if (obj.isFinal) {
        ele.style.left = 0
      }
    },
    getCurrentLocation () {
      let geo = new GeoLocation()
      let self = this
      geo.watchPosition(function (val) {
        self.setCurrentLocation(val)
      })
    },
    changeTilte: function (value) {
      this.title = value
    },
    goBack () {
      if (this.unSaved) {
        this.unSavedAlert()
        return
      }
      this.$router.back()
    },
    unSavedAlert () {
      let self = this
      Dialog.create({
        title: 'لم تحفظ التغيرات',
        message: 'هل تريرد الاستمرار في العوده للخلف',
        buttons: [
          'الغاء',
          {
            label: 'عد للخلف',
            handler () {
              self.unSaved = false
              self.goBack()
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
