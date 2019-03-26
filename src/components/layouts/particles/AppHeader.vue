
<template>
	<q-toolbar @click="goTop()" id="top" fixed-top>
    <q-btn icon="keyboard_arrow_right" @click="goBack" v-show="canGoBack"/>
 <!--  <slot name="rightBtn"></slot> -->
    <q-toolbar-title :padding="1" >
      <slot name="title" v-if="pageTitle">{{pageTitle}}</slot>
      <slot name="title" v-if="!pageTitle">
        <span class="logo-text text-primary text-droid-sans">{{ title }}</span>
      </slot>
    </q-toolbar-title>
     <!-- <slot name="leftBtn"></slot> -->
   <q-btn
      flat
      @click="$refs.layout.toggleLeft()"
    >
      <q-icon name="menu" />
    </q-btn>
	</q-toolbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { QIcon, QBtn, QToolbar, QToolbarTitle } from 'quasar'

export default {
  components: {QIcon, QBtn, QToolbar, QToolbarTitle},
  data: function () {
    return {
      back: false,
      title: 'رزقــــ'
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      pageTitle: 'settings/pageTitle'
    }),
    canGoBack () {
      if (this.$route.path === '/') {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/remove'
    }),
    goBack () {
      window.history.go(-1)
      if (this.$route.path === '/') {
        console.log(this.canGoBack)
      }
      console.log(this.pageTitle)
    },
    goTop () {
      // let el = document.getElementById('page') // this id in app.vue
      // let target = Utils.dom.getScrollTarget(el)
      // let offset = Utils.dom.offset(el)
      // console.log(Utils.dom.getScrollPosition(el))
      // Utils.dom.setScrollPosition(target, offset, [20])
      // // window.scrollTop = 0
      // el.scrollTop = 0
      // console.log(el.scrollTop)
    }
  }
}
</script>

<style type="scss">
  .logo-text{
    font-size: 1.7rem;
  }
</style>
