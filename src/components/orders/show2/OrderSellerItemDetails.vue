<template>
<!-- display order item for single seller  -->
<div class="show-up-ele no-margin no-padding bg-light" ref="postIdComments" v-touch-swipe="swipeToClose"
:class="{ 'show': isActive, 'hide': !isActive }">
      <div class="slide-btn text-center">
         <q-btn small round color="primary"  icon="keyboard_arrow_up" @click="expand('postIdComments')" v-if="!isActive"></q-btn>
         <q-btn small round color="primary"  icon="keyboard_arrow_down" @click="close('postIdComments')" v-if="isActive"></q-btn>
      </div>
         <q-modal-layout>
        <q-toolbar slot="footer">
          <div class="q-toolbar-title">
            Footer
          </div>
        </q-toolbar>
        <div class="layout-padding">
          <h1>Modal</h1>
          <q-btn color="primary" >Close</q-btn>
          <p class="caption" v-for="n in 15">This is a Modal presenting a Layout.</p>
        </div>
      </q-modal-layout>

</div>
</template>

<script>
import {mapGetters} from 'vuex'
import { TouchSwipe, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemTile, QItemMain, QItemSide, QScrollArea } from 'quasar'

export default{
  components: {QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemTile, QItemMain, QItemSide, QScrollArea},
  directives: {TouchSwipe},
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/user',
      posts: 'cart/cartProducts',
      isAddToCart: 'cart/isAdded'
    })
  },
  mounted: function () {
  },
  methods: {
    swipeToClose () {
      console.log('hey')
    },
    expand: function (id) {
      this.isActive = true
    },
    close: function (id) {
      this.isActive = false
    }
  }
}
</script>

<style type="scss">
	.show-up-ele {
    -webkit-transition: width 2s, height 4s; /* Safari */
    transition: width .3s, height .3s;
  }
  .slide-btn{
    position: relative;
    opacity: 1;
    top: -50px;


  }
  .show{
    height: 80%;
    opacity: 1;
  }
  .hide{
    height: 0%;
    opacity: .8;
  }
</style>
