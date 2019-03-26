<template>
  <!-- Don't drop "q-app" class -->
<div id="q-app">
  <q-layout  ref="layout" view="hHr LpR lFf">
 
  <q-toolbar id="top" slot="header" class="no-shadow text-center ">
  <q-btn @click="$refs.layout.toggleRight()" flat >
        <q-icon name="account_circle" />
      </q-btn>
     
 <!--  <slot name="rightBtn"></slot> -->
    <q-toolbar-title :padding="1" >
        <span class="logo-text text-droid-sans"> wefwefwef</span>
    </q-toolbar-title>
     <!-- <slot name="leftBtn"></slot> -->
     <q-btn @click="$refs.orders.open()" flat >
        <q-icon name="assignment" />
      </q-btn>
  </q-toolbar>
  <div slot="right">
  <q-list no-border link inset-separator class="text-center">
  <q-item class="text-center">
    <q-item-main>
       <img  class="avatar" v-if="user.avatar" :src="post.user.avatar" style="width:120px; height: 120px">
       <img  class="avatar" v-if="!user.avatar" src="~assets/avatar.png" style="width:120px; height: 120px">
    </q-item-main>
  </q-item>
  <q-item-separator />
     <q-side-link item :to="{name: 'user.account', params: {username: user.username} }" class="text-center">
      <!-- <q-item-side icon="rss feed" /> -->
       <q-item-side icon="settings" />
      <q-item-main label="الاعدادات" />
    </q-side-link>
    <q-item-separator/>
      <q-item @click="$refs.orders.open()" class="text-right" link> 
              <q-item-side icon="assignment" />
        <q-item-main>
          <span>الطلبات</span>
        </q-item-main>
      </q-item>
    <q-item-separator/>
    <q-item class="text-right" color="lime-14" > 
              <q-item-side icon="assignment" color="lime-14"/>
        <q-item-main label="حاله المتجر" sublabel="المتجر مفتوح" color="lime-14"/>
        
         <q-item-side>
           <q-toggle v-model="storeStatuts" color="lime-14" />
         </q-item-side>
      </q-item>

      
      <q-item @click="$refs.addPost.open()" class="text-center"> 
        <q-btn color="primary" icon="create"  class="full-width">
          <span>اضف منتج</span>
        </q-btn>
      </q-item>
    </q-list>
     
  </div>

          <keep-alive>
          <router-view />
          </keep-alive>

 <q-btn round color="primary" @click="$refs.cart.open()" class="fixed" style="left: 18px; bottom: 18px" v-if="cartShow">
  <q-icon name="shopping_basket" />
</q-btn>
  </q-layout>
  <cart ref="cart"></cart>
  <add-post ref="addPost"></add-post>
  <user-profile ref="userProfile"></user-profile>
</div>
</template>

<script>
/*
 * Root component
 */
import Cart from '../cart/Index'
import AddPost from '../posts/Add'
import {mapGetters} from 'vuex'
import {QTransition, QLayout, QIcon, QBtn, QToolbar, QToolbarTitle, QFixedPosition, QSideLink, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QScrollArea, QToggle} from 'quasar'

export default {
  components: {QTransition, Cart, AddPost, QLayout, QIcon, QBtn, QToolbar, QToolbarTitle, QFixedPosition, QSideLink, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QScrollArea, QToggle},
  data () {
    return {
      title: '',
      canGoBack: true,
      cartShow: true,
      storeStatuts: true,
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
      user: 'auth/user'
    })
    // title: function (value) {
    //   return value
    // }
  },
  methods: {
    changeTilte: function (value) {
      this.title = value
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
	.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
