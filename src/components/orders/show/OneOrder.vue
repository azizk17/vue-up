<template>
 <q-transition
  appear
  enter="slideInLeft"
  leave="fadeOutLeftBig"
  duration=800
>
<div class="layout-padding fullscreen bg-primary">
<p class="text-faded">one order has only one seller </p>
  <h1 class="text-light">hey man </h1>
</div>
</q-transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {QTransition} from 'quasar'

export default{
  components: {QTransition},
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
