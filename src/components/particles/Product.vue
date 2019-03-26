<template>
<div>
  <div v-for="post in posts">
  <div class="row" style="padding-top:10px;">
      <div class="width-1of6">
        <img  class="avatar" :src="post.user.avatar">
      </div>
      <div class="width-5of6 text-right" style="padding-top: 10px">
        <div class="row">
        <router-link :to="{ name: 'user.profile', params: { username: post.user.username }}">
           <span class="text-bold">{{ post.user.username}}</span>
        </router-link>
        </div>
        <div class="row">
          <router-link :to="{ name: 'user.location', params: { username: post.user.username }}">
          <span class="text-lighter">{{ post.user.location}}<i>keyboard_arrow_left</i></span>
          </router-link>
        </div>
      </div>
  </div>
  <q-slider  v-if="post.images.length > 1" dots actions class="text-white" style="direction:ltr; text-shadow: 0 0 3px #000000;">
  <div v-for="image in post.images"slot="slide" style="background: #f6f6f6">
    <img class="slide-image" :src="image">
  </div>
  <i slot="action" @click="addToCart(post)" v-if="!isAddToCart(post)">
    add_shopping_cart
  </i>
   <i slot="action" @click="removeFromCart(post)" style="color: red;" v-if="isAddToCart(post)" class="animated bounceIn">
   remove_shopping_cart
  </i>
</q-slider>
  <q-slider  v-if="post.images.length == 1"  actions class="text-white" style="direction:ltr; text-shadow: 0 0 3px #000000;">
  <div v-for="image in post.images"slot="slide" style="background: #f6f6f6">
    <img class="slide-image" :src="image">
  </div>
  <i slot="action" @click="addToCart(post)" v-if="!isAddToCart(post)">
    add_shopping_cart
  </i>
   <i slot="action" @click="removeFromCart(post)" style="color: red;" v-if="isAddToCart(post)" class="animated bounceIn">
   remove_shopping_cart
  </i>
</q-slider>
<div class="bg-primary text-white text-right" style="padding-right: 13px; line-height:2"> 
  {{ post.ready}}
</div>
<div class=" post-footer">
<div class="row" style="padding: 5px 0"> 
<div class="width-3of3 text-right">
  <span>{{ post.desc }}</span>
</div>
<div class="width-1of5 text-left">
  <span class="text-bold">{{ post.price }}</span>&nbsp;<span>ريال</span>
</div>
</div>
  <span class="text-lighter" v-if="post.comments.length > 2">مزيد من التعليقات</span>
  <div class="row" v-for="(comment, index) in post.comments">
    <div class="row" v-if="index <= 2">
    <span class="text-bold">{{ comment.user }}</span> &nbsp;
    <span> {{ comment.comment}} </span>
    </div>
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

    }
  },
  props: ['posts'],
  computed: {
    ...mapGetters({
      cartPrdoucts: 'cart/cartProducts',
      isAddToCart: 'cart/isAdded'
    })
  },
  methods: {
    ...mapActions({
      add: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart'
    }),
    addToCart: function (item) {
      console.log(item)
      this.add(item)
    }
  }
}
</script>
