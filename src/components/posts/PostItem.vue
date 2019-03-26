<template>
<q-transition enter="fadeIn" leave="fadeOut">
<div>


  <!-- ########## items ############## -->

  <router-link tag="div" :to="{ name: 'posts.show', params: { id: item.id }}" style="position: relative" class="kk">

   <q-card color="white" class="full-width items-center card-border-round" flat  style="position:relative" :class="{'bg-grey-4': isAddedToCart(item)}">
    <q-card-title v-if="!hideHeader">
    <router-link tag="div" :to="{ name: 'user.profile', params: { username: item.user.username }}" class="card-avatar-container" v-if="item.user">
<!--  -->
       <avatar :src="item.user.avatar" height="50px" width="50px" ></avatar>

    </router-link>
    <router-link tag="div" :to="{ name: 'user.profile', params: { username: item.user.username }}" class="card-username-container"  v-if="item.user">
      <span class="text-primary"> {{item.user.name ? item.user.name : item.user.username }}</span>
      <span class="text-faded" style="font-size: 12px">{{item.user.username}}@</span>
    </router-link>
     
        <div slot="right" class="row items-center" @click.stop="$router.push({name: 'user.location', params: {username: item.user.username}, query: {owner: item.user.username, lat: item.user.market.location.lat, lng: item.user.market.location.lng}})">
          <q-chip small color="lime-5" style="margin-left: 3px" v-if="marketStatus">
            <span>مفتوح</span>
          </q-chip>
          <q-chip small color="grey-4" style="margin-left: 3px; border-radius: 0" v-if="!marketStatus">
            <span>مغلق</span>
          </q-chip>
        <span class="text-faded tesx-left" style="direction: ltr">{{distance ? distance  : item.user.market.location.city}}</span>
        <q-icon name="place" color="red-7"/> 
      </div>
    </q-card-title>
    <q-card-media style="border-radius: 12px " id="id1">
    <q-icon name="more_vert" size="33px" class="more-icon" 
    @click.stop="item.user.username === auth.username ? ownerOptions(item) : moreOptions(item)"/>

    <!-- ########################### media ############################# -->
    <img v-for="media in item.media" :src="media.filename" class="responsive" v-if="singleMedia">
      <swiper :options="swiperOption" :not-next-tick="notNextTick" :ref="'swiper-' + item.id" class="text-primary text-center" :style="{zIndex:0, backgroundColor: randomColor}" v-if="!singleMedia">
        <!-- slides -->
     <!--    <swiper-slide>
          <progressive-img v-for="(media , index) in item.media" v-if="index === 0"
          :src=" media.filename"
          :blur='30'
          class="card-border-round responsive"
          :style="{zIndex:0, backgroundColor: randomColor}"
          :class="{'added-to-cart': isAddedToCart(item)}"
      />
        </swiper-slide> -->

        <swiper-slide v-for="(media , index) in item.media">
          <img :src="media.filename" class="responsive">
        </swiper-slide>
       </swiper>
      <q-icon name="check_circle" color="amber-7"  id="icon1" class="added-to-cart-icon" v-if="isAddedToCart(item)"/>
 
      <q-card-title slot="overlay" >

         <span class="strong" style="font-size: 2em">{{item.description}}</span>
      </q-card-title>
    </q-card-media>
    <q-card-main class="full-width " style="padding: 0px">
    
    <div class="row  no-margin" style="padding: 3px 7px">
          
            <div class="col-auto row text-grey-6">
              
              <div class="stat-item" @click.stop="test('444')">
                <q-icon name="chat_bubble_outline" size="23px"/>
                <span class="stat-num">{{item.count_comments}}</span>
              </div>


              <div class="stat-item" @click.stop="favorite(item)" :class="{'text-red-5 animate-pop': item.isFavorited}">
                <q-icon :name="!item.isFavorited ? 'favorite_border' : 'favorite'" size="23px" />
                <span class="stat-num">{{item.count_likers}}</span>
              </div>
              <div v-if="item.user.username != auth.username"class="stat-item" @click.stop="toggleCart(item)" :class="isAddedToCart(item) ? 'text-amber-8' : '' ">
                <q-icon :name="!isAddedToCart(item) ? 'shopping_cart' : 'remove_shopping_cart'" size="23px"/>
              </div>

              <div class="stat-item" v-if="!singleMedia">
                     <div class="swiper-pagination"  slot="pagination" :class="'swiper-pagination-' + item.id"></div>
              </div>
            </div>
            <div class="col text-left" style="line-height: 1.7;">
              <span class="text-bold text-primary">{{ item.price }}</span> <span class="text-faded" style="font-size: 13px">ريال</span>
            </div>
          </div>
  
    </q-card-main>
    <!-- #### commnets #### -->
     	
	<slot name="comments" class="no-margin no-padding"></slot>     	
	 </q-card>
 </router-link>
 

 </div>

 </q-transition>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import {QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QItemSeparator, QItem, QItemSide, QItemMain, QItemTile, TouchPan, QInnerLoading, QSpinnerDots, ActionSheet, QTransition, QCarousel, QChip} from 'quasar'
import PostItemComments from './PostItemComments'
import GeoLocation from '../../utils/GeoLocation'
export default {
  components: {PostItemComments, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QItemSeparator, QItem, QItemSide, QItemMain, QItemTile, QInnerLoading, QSpinnerDots, ActionSheet, QTransition, QCarousel, QChip},
  directives: {TouchPan},
  props: ['item', 'showComments', 'hideHeader'],
  data () {
    return {
      notNextTick: true,
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        spaceBetween: 0,
        pagination: '.swiper-pagination-' + this.item.id
      },
      commentText: '', // comment
      postCommentLoading: false, // sumbit btn of addning a comment
      isAddCommnet: false, // comment full screen page
      moreCommentsLoading: false, // load more comments spinners
      moreCommentsBtn: true, // hide or show load more comments btn
      like: false,
      loading: false,
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
      auth: 'auth/user',
      getLat: 'client/getLat',
      getLng: 'client/getLng'
    }),
    distance () {
      let geo = new GeoLocation()
      let owner = {
        lat: this.item.user.market.location.lat,
        lng: this.item.user.market.location.lng
      }
      let user = {
        lat: this.getLat,
        lng: this.getLng
      }
      let b = geo.distance(owner.lat, owner.lng, user.lat, user.lng, 'KM')
      return b + ' KM'
    },
    marketStatus () {
      return this.item.user.market ? this.item.user.market.available : null
    },
    singleMedia () {
      return this.item.media.length <= 1
    },
    randomColor () {
      let colors = [
        'rgba(221,87,122, 0.5)', // pink
        'rgba(255,240,207, 0.5)', // page
        'rgba(73,174,192, 0.5)', //
        'rgba(127,117,118, 0.5)', //
        'rgba(243,242,222, 0.5)', //
        'rgba(172,168,159, 0.5)', //
        'rgba(126,82,73, 0.5)', //
        'rgba(97,174,36, 0.5)', //
        'rgba(0,161,203, 0.5)', //
        'rgba(229,64,40, 0.5)' //
        // 'rgba(221,87,122, 0.3)', // pink
        // 'rgba(221,87,122, 0.3)', // pink
        // 'rgba(221,87,122, 0.3)', // pink
        // 'rgba(221,87,122, 0.3)', // pink
        // 'rgba(221,87,122, 0.3)' // pink
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
  },
  created: function () {
    // this.$parent.$options.parent.changeTilte(this.title)
    this.interactive()
  },
  beforeMount: function () {
  },
  mounted () {
    let self = this
    this.$on('comment-added', function (comment) {
      self.item.comment.push(comment)
    })
    if (this.item.user) {
      // this.getDestination(this.item.user.market.location.lat, this.item.user.market.location.lng)
    }
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart'
    }),
    test (name) {
      console.log(this.getLat)
    },
    // getDestination (lat, lng) {
    //   let owner = new window.google.maps.LatLng(lat, lng)
    //   let user = new window.google.maps.LatLng(this.getLat, this.getLng)
    //   var service = new window.google.maps.DistanceMatrixService()
    //   service.getDistanceMatrix(
    //     {
    //       origins: [owner],
    //       destinations: [user],
    //       travelMode: 'DRIVING',
    //       unitSystem: window.google.maps.UnitSystem.METRIC
    //     }, this.getDestinationResult)
    // },
    // getDestinationResult (response, status) {
    //   let self = this
    //   if (status === 'OK') {
    //     var origins = response.originAddresses
    //     // var destinations = response.destinationAddresses

    //     for (var i = 0; i < origins.length; i++) {
    //       var results = response.rows[i].elements
    //       for (var j = 0; j < results.length; j++) {
    //         var element = results[j]
    //         var distance = element.distance.text
    //         self.distance = distance
    //         // var duration = element.duration.text
    //         // var from = origins[i]
    //         // var to = destinations[j]
    //       }
    //     }
    //   }
    // },
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
          self.toggleCart(self.item)
        }
      }
      if (obj.isFinal) {
        ele.style.left = 0
      }
    },
    lunch (name, params) {
      this.$router.push({name: name, params: params})
    },
    toggleCart (item) {
      if (this.isAddedToCart(item)) {
        this.removeFromCart(item)
        return
      }
      this.addToCart(item)
    },
    favorite (post) {
      post.isFavorited = !post.isFavorited
      post.count_likers = !post.isFavorited ? post.count_likers - 1 : post.count_likers + 1
      let path = window.apiUrl + '/posts/' + post.id + '/favorite'
      let data = {
        id: post.id
      }
      axios.post(path, data).then(function (res) {
        console.log(res)
      })
    },
    delete (item) {
      let self = this
      let path = window.apiUrl + '/posts/' + item.id + '/delete'
      let data = {
        id: item.id
      }
      axios.post(path, data).then(function (res) {
        self.$emit('post:deleted', item)
      })
    },
    share () {
    },
    report () {
    },
    moreOptions (item) {
      ActionSheet.create({
        gallery: true,
        actions: [
          {
            label: 'اضف للسله',
            icon: 'shopping_cart',
            handler () {
            }
          },
          {
            label: 'ابلاغ',
            icon: 'bug_report',
            handler () {
              console.log('Batman.')
            }
          },
          {
            label: 'مشاركه',
            icon: 'share',
            handler () {
              console.log('Batman.')
            }
          }
        ]
      })
    },
    ownerOptions (item) {
      let self = this
      ActionSheet.create({
        gallery: true,
        actions: [
          {
            label: 'حذف',
            icon: 'delete',
            handler () {
              self.delete(item)
            }
          },
          {
            label: 'مشاركه',
            icon: 'share',
            handler () {
              console.log('Batman.')
            }
          }
        ]
      })
    },
    interactive () {
      // let self = this
      // console.log('update')
      // window.Echo.channel('market.' + this.item.user.market.id)
      //   .listen('Markets.UpdateMarketStatus', (e) => {
      //     console.log(e)
      //     // self.item.user.market = e.market
      //   })
    }
  }
}
</script>

<style lang="scss" >
.slide-image{
  width: 100%;
  height: 100%;
}
.q-slider-track > div {
  padding:0;
}
.q-slider-track.with-toolbar > div {
    // padding-bottom: 3.3rem;
    padding-bottom: 0;
}
.item-footer{
  padding: 5px 13px;
}
.card-avatar-container{
 
  float: right;
}
.card-avatar-container img{
  width: 40px;
  height: 40px
}
.card-username-container {
  
  float: right;
  line-height: 1;
  padding: 5px
}
.card-username-container span{
  display: block;
    margin: 0;
    padding: 0;
}
.online {
	border: 2.7px #aeea00 solid ;
	padding: 1px;
}
.card-name, .card-username{
    

}
.card-name{

}
.card-username{

}
.card-media-desc{
    
    position:relative;
background: rgba(55,255,255,0.5);
}
.stat-num{
  vertical-align: middle;
  font-size: 13px;
  margin-right: -3px; 
  font-family: sans-serif;
  font-weight: 100;

}
.stat-item {
  margin: 0 10px;
}
.added-to-cart {
    filter: blur(3px)
}

.added-to-cart-icon , .blr{
    font-size: 900%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;    
}
.added-to-cart-icon {
  
}
.more-icon {
	position: absolute;
    z-index: 1;
    padding: 10px;
    left: 0;
    text-shadow: 0px 0px 15px #000;
    &:hover {
    outline: 0;
    color: gray;
    }
}
.blr {
  filter: blur(4px);
  
}
.bg-shadow{
	z-index: 2;
	&:after{
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: green;
		z-index: 1;
		background: linear-gradient(to bottom, rgba(255,0,0,0), rgba(255,0,0,1)); /* Standard syntax (must be last) */
	}
}
.bg-blur {
	z-index: 3;
	&:before{
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
		opacity: .8;
		filter: blur(5px);
		background: #fff;
	}

}
.q-card-media-overlay {
    color: #fff;
    background: linear-gradient(to bottom, rgba(255,0,0,0), rgba(0,0,0,0.4));
}
.add-comment-page{
	&:before{
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		z-index: 1;
		opacity: .7
	}
}
.add-comment-box{
	z-index: 2;
	padding: 0 5px;
}
.swiper-pagination {
  opacity: .4;
}
.swiper-pagination-bullet {
  width: 5px;
  height: 5px;
  margin: 0 2px;
}

</style>
