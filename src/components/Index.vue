<template>
<page ref="page">
<div slot="hed-left" >
    <q-btn @click="$refs.page.$refs.layout.toggleLeft()" flat round color="grey-6" v-if="auth">
        <avatar :src="authUser.avatar" height="35px" width="35px"></avatar>
    </q-btn>
    <q-btn @click="$refs.page.$refs.layout.toggleLeft()" flat round color="grey-6" v-if="!auth">
       <q-icon name="more_vert" size="24px" color="grey-6" />
    </q-btn>
</div>
<div slot="hed-right">
<q-btn @click="$refs.page.$refs.layout.toggleRight()" flat round color="grey-6" icon="shopping_cart">
</q-btn>
</div>
<div slot="menu">
  <right-menu></right-menu>
</div>
<div slot="content">
     

<!-- ########################## if loading error  ####################### -->
<!--    <div v-show="loading || error">
      <div class="text-center" style="padding-top: 140px" v-show="loading">
          <spinner :size="30" class="text-center"></spinner>
        </div>
        <div class="text-center" style="padding-top: 140px" v-show="error" @click="getFeed()">
           <span>حدث خطا !!</span>
           <span>اضغط هنا لاعاده التحميل</span>
        </div>
  </div> -->

  <!-- ################## loaded page ############## -->
  <div class="bg-white text-center no-items-box" v-if="!posts">
      <span class="text-primary">نأسف لايوجد منتجات متاحه حولك</span>
  </div>
  <div class="text-center  no-items-box" v-if="loading">
      <q-spinner-dots  class="text-center" slot="message" :size="40"></q-spinner-dots>
  </div>
  <div v-if="posts && !loading" class="text-center">

        <post-item  v-for="post in posts" :item="post" @post:deleted="removePost(post)"></post-item>
        <div @click="loadMore()" v-if="pages.next_page_url != null">
         <q-spinner-dots v-if="moreLoading" class="text-center" slot="message" :size="40"></q-spinner-dots>
          <span v-if="!moreLoading">more</span>
        </div>
  </div>

</div>
</page>
</template>

<script>

import AppFooter from './layouts/particles/AppFooter'
import Product from './particles/Product'
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import {QInfiniteScroll, QPullToRefresh, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QChip, QItem, QItemSide, QItemMain, QItemTile, TouchPan, QSpinnerDots} from 'quasar'

export default {
  components: {AppFooter, Product, QPullToRefresh, QInfiniteScroll, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QItem, QItemSide, QItemMain, QItemTile, QChip, QSpinnerDots},
  directives: {TouchPan},
  data () {
    return {
      posts: [],
      test1: [],
      like: false,
      pages: {next_page_url: null},
      loading: false,
      moreLoading: false,
      error: false,
      dump: [
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'aziz'}},
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'aziz'}},
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'r44'}},
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'majed'}},
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'aziz'}},
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'aziz'}},
        {'description': 'say something about it', 'price': 443, 'user': {'avater': 's.png', 'username': 'aziz'}}

      ]
    }
  },
  computed: {
    ...mapGetters({
      cartPrdoucts: 'cart/cartProducts',
      isAddedToCart: 'cart/isAdded',
      authUser: 'auth/user',
      auth: 'auth/auth'
    })
  },
  created: function () {
    // this.$parent.$options.parent.changeTilte(this.title)
  },
  beforeMount: function () {
  },
  mounted () {
    this.auth ? this.getFeed() : this.guestFeed()
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart'
    }),
    guestFeed () {
      let self = this
      this.loading = true
      axios.get(window.apiUrl + '/guests/feed').then(function (res) {
        self.posts = res.data.data
        self.loading = false
        self.pages = res.data
      }).catch(error => {
        console.log(error)
        self.loading = false
      })
    },
    swipeCard (obj) {
      let self = this
      if (obj.direction === 'left') {
        return
      }
      // elemnet to be controlled
      let ele = obj.evt.target.closest('.q-card')

      if (obj.direction === 'right') {
        //  making sure left is 0
        ele.style.left = obj.distance.x + 'px'
        if (obj.isFinal && obj.distance.x > 225) {
          ele.style.left = 0
          self.toggleCart(self.posts[ele.id])
        }
      }
      if (obj.isFinal) {
        ele.style.left = 0
      }
    },
    lunch (name) {
      this.$refs[name].open()
    },
    loadMore () {
      let self = this
      this.moreLoading = true
      if (this.pages.to < this.pages.total) {
        let path = this.pages.next_page_url
        axios.get(path).then(function (res) {
          for (var i = 0; i < res.data.data.length; i++) {
            self.posts.push(res.data.data[i])
          }
          self.pages = res.data
          self.moreLoading = false
        }).catch(res => {
          self.moreLoading = false
        })
      }
      else {
        this.moreLoading = false
      }
    },
    getFeed () {
      let self = this
      this.loading = true
      this.error = false
      let path = window.apiUrl + '/posts/home/feed'
      axios.get(path).then(function (res) {
        self.$nextTick(() => {
          self.posts = res.data.data
          self.loading = false
        })
      }).catch(res => {
        self.error = true
      })
    }
  }
}
</script>

<style lang="scss" >

.no-items-box {
  position: absolute;
  top: 30%;
  right: 13px;
  left: 13px;
  margin: auto;
  padding: 13px;
  border-radius: 7px;
}

</style>
