<template>    
    <router-view></router-view>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
export default{
  data () {
    return {
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
    this.init()
  },
  methods: {
    init: function () {
      axios.get(window.apiUrl + '/orders/' + this.auth.username + '/active').then(function (res) {
        console.log(res)
      })
    }
  }
}
</script>

<style type="scss">
	
</style>
