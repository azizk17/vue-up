<template>
<page v-if="info">

<div  v-if="showInfoOnHeader"  slot="title">
  <q-transition appear  enter="fadeIn" leave="fadeOut">
    <span>
     <span class="text-faded">{{ info.username }}</span><span class="text-faded">@</span>
     </span>
  </q-transition>
</div>
<div slot="hed-left"  v-if="showInfoOnHeader">
      <q-transition appear  enter="fadeIn" leave="fadeOut">
       <avatar :src="info.avatar" height="40px" width="40px"></avatar>
       </q-transition>
</div>
<div slot="content">
  <q-scroll-observable @scroll="userHasScrolled"/>

    <div class="row ">
    <!-- info  -->
      <div class="col relative-position" style="min-height: 120px">
        <span class="text-bold text-primary">{{ info.name }}</span>
        <span class="text-faded text-left" style="direction: ltr">@{{ info.username }}</span>
        <span class="block text-faded" style="font-size: 1.2em" @click.stop="$router.push({name: 'user.location', params: {username: info.username}, query: {owner: info.username, lat: info.market.location.lat, lng: info.market.location.lng}})">
          33km
          <q-icon name="place" style="vertical-align: text-top"/>
        </span>
        <div class="info-main">
        {{ info.bio }}
       </div>
            <div class="info-footer absolute-bottom text-faded">
               <ul class="no-padding no-margin">
                <li class="text-center no-padding no-margin">
                  <span class="block strong" style="font-size:1.3em">555</span>
                  <span>العملاء</span>
                </li>
               <li class="text-center no-padding no-margin">
                  <span class="block stronga" style="font-size:1.3em">{{info.c_followers}}</span>
                  <span class=" block light-paragraph">المتابعين</span>
                </li>
                 <li class="text-center no-padding no-margin">
                  <q-btn v-if="!followed" color="primary" class="fit no-padding no-margin no-shadow animate-pop"  style="border-radius: 7px" @click="following(info.username)">تابع</q-btn>
                   <q-btn v-if="followed" color="primary" outline class="fit no-padding no-margin no-shadow animate-pop"  style="border-radius: 7px" @click="followed = !followed">الغاء المتابعه</q-btn>
                </li>
              </ul>
            </div>
           
        </div>
        <!-- avatar  -->
      <div class="col-4 text-center">
      <avatar :src="info.avatar" height="90px" width="90px"></avatar>
      </div>
    </div>
    <!-- options -->
    <q-tabs no-pane-border two-lines  inverted style="padding: 15px 0 0 0">
  <!-- Tabs - notice slot="title" -->
  <q-tab default slot="title" name="tab-1"  icon="blur_on" />
  <q-tab  slot="title" name="tab-2" label="عروض" />
  <q-tab alert slot="title" name="tab-3" label="الاكثر طلب" />
  <!-- Targets -->
  <q-tab-pane name="tab-1" class="no-padding">
         <post-item v-for="post in posts" :item="post" :hideHeader="true"></post-item>
  </q-tab-pane>
  <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
  <q-tab-pane name="tab-3">Tab Three</q-tab-pane>

</q-tabs>
  
</div>

</page>

  
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, Dialog, QCard, QCardTitle, QCardMedia, QCardMain, QCardSeparator, QCardActions, QBtn, QRating, GoBack, QItem, QItemMain, QItemSide, QItemTile, QTabs, QTab, QTabPane, QScrollObservable, QTransition} from 'quasar'
export default {
  components: {QModal, QModalLayout, QCard, QCardTitle, QCardMedia, QCardMain, QCardSeparator, QIcon, QCardActions, QBtn, QRating, QToolbar, QToolbarTitle, QItem, QItemMain, QItemSide, QItemTile, QTabs, QTab, QTabPane, QScrollObservable, QTransition},
  directives: {
    GoBack
  },
  data () {
    return {
      username: this.$route.params.username,
      info: {},
      posts: {},
      postsLoading: false,
      postsError: false,
      ratingModel: 4,
      followed: false,
      showInfoOnHeader: false
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      authUser: 'auth/user',
      isAddedToCart: 'cart/isAdded'
    }),
    avatar () {
      return require('assets/avatar.png')
    }
  },
  created: function () {
  },
  watch: {
    '$route' (to, from) {
      if (to.params.username) {
        this.intiData('/guests/user/' + this.$route.params.username + '/show')
      }
    }
  },
  mounted: function () {
    let self = this
    if (this.auth) {
      this.intiData('/user/' + this.$route.params.username + '/show')
      this.getPosts('/posts/' + this.$route.params.username + '/all')
    }
    else {
      this.intiData('/guests/user/' + this.$route.params.username + '/show').then(function (res) {
        self.getPosts('/guests/posts/' + self.$route.params.username)
      })
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/remove',
      addToCart: 'cart/addToCart',
      removeFromCart: 'cart/removeFromCart',
      cartPrdoucts: 'cart/cartProducts'
    }),
    userHasScrolled (scroll) {
      console.log(scroll)
      if (scroll.position < 300) {
        this.showInfoOnHeader = false
      }
      else {
        this.showInfoOnHeader = true
      }
    },
    test (data) {
      console.log(this.$parent.$refs.userProfile.$refs.page.open())
    },
    open () {
      this.$refs.page.open()
    },
    handler: function (obj) {
      console.log(obj.psoition) // {x: 22, y: 451}
      console.log(obj.duration) // 78
    },
    intiData: function (path) {
      // if (this.auth && !this.$route.params.username) {
      //   this.info = this.authUser
      //   this.getMedia(this.info.username)
      //   return false
      // }
      // if (this.auth && this.$route.params.username === this.authUser.username) {
      //   this.info = this.authUser
      //   this.getMedia(this.info.username)
      // }
      // else {
      let self = this
      return window.axios.get(window.apiUrl + path).then(function (res) {
        console.log('rfrfrfrrf', res.data)
        self.info = res.data
      }).catch(function (res) {
        console.log(res.data)
        // on errors ceater dilog
        Dialog.create({
          title: 'خطا',
          message: 'العضو محذوف',
          noBackdropDismiss: true,
          noEscDismiss: true,
          buttons: [
            {
              label: 'اغلاق',
              handler () {
                // window.history.go(-1)
              }
            }
          ]
        })
      })
    },
    getData: function (username) {
      let self = this
      window.axios.get(window.apiUrl + '/user/' + username + '/info').then(function (res) {
        self.info = res.data
      })
    },
    getPosts: function (path) {
      let self = this
      this.postsLoading = true
      this.postsError = false
      window.axios.get(window.apiUrl + path).then(function (res) {
        self.posts = res.data.data
        self.postsLoading = false
      }).catch(res => {
        self.postsLoading = false
        self.postsError = true
      })
    },
    toggleCart (post) {
      event.cancelBubble = true
      if (event.stopPropagation) event.stopPropagation()
      if (this.isAddedToCart(post)) {
        this.removeFromCart(post)
        return
      }
      this.addToCart(post)
    },
    imgPath: function (media) {
      // get full path since post object has filename only
      return window.apiUrl + '/posts/media/' + media[0]
    },
    getAvatar (filename) {
      return window.apiUrl + '/user/avatar/' + filename
    },
    following: function (username) {
      let path = window.apiUrl + '/user/' + this.authUser.username + '/following/' + username

      return window.axios.post(path).then(function (response) {
        console.log(response)
      }).catch(function (res) {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
      width: 90px;
    height: 90px;
}
.user_info{
	background: #f6f6f6;
	.destination{
		line-height: 2;
	}
	.content{
		
	}
	.info{
			padding: 13px 16px;
			background: #fff;
	}
	.bio{
		padding-bottom:13px;
	}
	.stat{
		padding-bottom: 13px;
	}

}
.img-list-btn{
	border: 1px solid #f6f6f6;
	border-right: none;
	border-left: none;
}
.info-main{
  display: block;
  padding-top: 15px;
  padding-bottom: 25%;
}

.info-footer{
  ul {
    display: table;
    width: 100%;
    > li {
    display: table-cell;
    vertical-align: bottom;
    padding: 5px;
    }
    li:nth-child(2),  li:nth-child(1){
      width: 25%;
      text-align: right;
    }
    li:first-child{
    }
    li:last-child{
    }
  }
}
.options-bar {
  padding: 15px 0;
 
}
  


</style>
