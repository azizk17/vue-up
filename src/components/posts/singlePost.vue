<template>
  <div>
   <div v-show="loading || error">
      <div class="text-center" style="padding-top: 140px" v-show="loading">
          <spinner :size="30" class="text-center"></spinner>
        </div>
        <div class="text-center" style="padding-top: 140px" v-show="error" @click="getMedia()">
           <span>حدث خطا !!</span>
           <span>اضغط هنا لاعاده التحميل</span>
        </div>
  </div>
  <div  v-if="!loading">
  	<div class="card bg-white text-right no-border no-shadow">
		<div class="row" style="padding-top:10px;">
      <div class="width-1of6">

        <img  class="avatar" v-if="post.user.avatar" :src="post.user.avatar">
        <img  class="avatar" v-if="!post.user.avatar" src="~assets/avatar.png">


      </div>
      <div class="width-5of6 text-right" style="padding-top: 10px">

        <div class="row">
        <router-link :to="{ name: 'user.profile', params: { username: post.user.username }}">
           <span class="text-bold">{{ post.user.username}}</span>
        </router-link>
        </div>
        <div class="row">
          <router-link :to="{ name: 'user.location', params: { username: post.user.username }}" v-if="post.user.location">
          <small class="ext-grey-6">{{ post.user.location}}<i style="font-size: 1rem">keyboard_arrow_left</i></small>
          </router-link>
          <small class="text-grey-6 ">العنوان غير محدد</small>
        </div>

      </div>
    </div>  
  	
	  <div class="card-content no-padding ">
	    <img src="http://ichef-1.bbci.co.uk/news/660/cpsprodpb/1325A/production/_88762487_junk_food.jpg" class="responsive">
	  </div>

	  <div class="card-actions post-actions">
	  	<div class="text-primary">
            <i>thumb_up</i> 11k 
          </div>
          <div class="auto"></div>
          <div class="text-primary">
          </div>
          <div class="auto"></div>
          <span class="chip label bg-grey-2 text-primary" @click="toggleCart(post)">
          <span>{{post.price}}</span>&nbsp;<span> ريال </span>
           <span class=" add-to-cart bg-grey-3 text-orange-4"   v-if="!isAddedCart(post)">
            <i>add_shopping_cart</i>
          </span>
          <span class="circular add-to-cart bg-grey-3 text-negative animated bounceIn" v-if="isAddedCart(post)">
            <i>remove_shopping_cart</i>
          </span>
          </span>
	  </div>

	  <!-- extra detalis  -->
	  <div class="row" style="padding: 0px 13px">
	  	<div>{{post.description}}</div>
	  </div>
	  <div class="row bg-yellow-7 " style="padding: 0px 13px">
	  	<span style="padding:7px 0 ">{{post.ready_at}} ready at </span>
	  </div>

	  <!-- comments -->
	  <div class="no-wrap" style="padding: 5px 13px" @click="openCommentsPage(post.comments)">
	    <span class="text-grey-5" v-if="post.comments.length === 0">لا يوجد تعليقات</span>
		<div  v-for="(comment, index) in post.comments" style="padding: 2px 0px">
		  <!-- <div v-if="index <= 1"> -->
			<span>
			   <span class="text-bold pull-right">{{ comment.user.username }}</span> &nbsp;
			   <span> {{ comment.comment}} </span>
		   </span>
		  <!-- </div> -->
		</div>
		<!-- <span class="text-grey-5" v-if="post.comments.length > 2" @click="getAllComments()">مزيد من التعليقات</span> -->

		<!-- open all comment in new page -->
		  <comments :comments="post.comments" :post="post.id" ref="allComments"></comments>
		

  	  </div>
	  
	</div>

 
  </div>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      post: {},
      comments: {},
      error: false,
      loading: true,
      media: [
        'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/1325A/production/_88762487_junk_food.jpg',
        'http://wallpapersdsc.net/wp-content/uploads/2016/09/Junk-Food-HD-Wallpaper.jpg',
        'https://ichef.bbci.co.uk/images/ic/480xn/p01n985l.jpg'
         // 'http://pixel.nymag.com/imgs/daily/grub/2016/03/02/magazine/03-bony-food-lede.w400.h600.jpg'
      ]
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      authUser: 'auth/user',
      isAddedCart: 'cart/isAdded'
    })
  },
  created: function () {
    this.getMedia(this.$route.params.id)
  },
  mounted: function () {
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart',
      cartPrdoucts: 'cart/cartProducts'
    }),
    getMedia: function (id) {
      let self = this
      this.loading = true
      this.error = false
      window.axios.get(window.apiUrl + '/posts/' + id).then(function (res) {
        self.post = res.data
        self.loading = false
      }).catch(res => {
        this.loading = false
        this.error = true
      })
    },
    openCommentsPage: function (comments) {
      this.comments = comments
      this.$refs.allComments.$refs.comments.open()
    }
  }
}

</script>

<style>
</style>
