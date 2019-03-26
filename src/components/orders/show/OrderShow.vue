<template>
<div>
<q-modal ref="page"  position="top"  :content-css="{minWidth: '100%', minHeight: '100%', direction: 'rtl'}">
  <q-modal-layout>

    <div >
    <q-card   color="light" class="no-margin">
      <router-link to="ffr">
        <q-card-title>
          <span class="text-primary">
            <q-transition
              appear
              enter="swing"
              leave="fadeOut"
            >
  <!-- Wrapping only one DOM element, defined by QBtn -->
  <q-btn color="secondary" icon="mail">
    Email
  </q-btn>
</q-transition>
          </span>

          <div slot="right" class="row items-center text-primary">
             <q-btn flat >
      <q-icon color="primary" name="close" @click="goBack()"/>
    </q-btn>
          </div>
        </q-card-title>
        <q-card-main class="text-center ">
        <span class="text-primary" style="font-size: 2em">حاله الطلب</span>
        </q-card-main>
         <q-card-main>
        <span class="text-green" style="font-size: 1.2em">555 ريال</span>
        <span class="pull-left text-faded">#4456</span>
        </q-card-main>
        <q-card-separator />
        </router-link>
    </q-card>

    <!-- list -->
    <q-card  flat color="light-green-2" class="no-margin">
      <router-link to="ffr">
        <q-card-title>
          <span class="text-primary">
            <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
          </span>
          <span>@username</span>

          <div slot="right" class="row items-center text-primary">
             #4445
          </div>
        </q-card-title>
        <q-card-main>
        <img src="http://s1.picswalls.com/wallpapers/2015/12/12/awesome-beautiful-wallpaper_124413582_294.jpg" style="width: 90px; height: 60px">
        <img src="http://www.technocrazed.com/wp-content/uploads/2015/12/beautiful-wallpaper-download-14.jpg" style="width: 90px; height: 60px">
        <img src="http://images4.fanpop.com/image/photos/18500000/Beautiful-Color-roses-18577543-1280-800.jpg" style="width: 90px; height: 60px">
        <img src="http://webneel.com/daily/sites/default/files/images/daily/07-2015/3-beautiful-peacock-photo-by-sibiar.preview.jpg" style="width: 90px; height: 60px">
      
        
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
         <q-progress percentage="70" stripe animate style="height: 5px" />
              <span class="text-primary">iojerjf</span>

        </q-card-actions>
        </router-link>
    </q-card>
      <div class="row">
              <q-btn color="primary" @click="$refs.basicModal.open()">Close</q-btn>
      <q-modal ref="basicModal" minimized :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <q-card  flat color="light-green-2" class="no-margin">
        <q-card-title>
          <span class="text-primary">
            <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
          </span>
          <span>@username</span>

          <div slot="right" class="row items-center text-primary">
             #4445
          </div>
        </q-card-title>
        <q-card-main>
        <!-- <q-gallery-carousel fullscreen :src="gallery" dots/> -->
        <q-btn color="primary" glossy @click="$refs.modal.open()">
  Launch
</q-btn>
<q-modal ref="modal" class="maximized">
  <q-carousel  class="text-white full-height">
    <div slot="slide" class="bg-tertiary ">
         
    </div>
    <div slot="slide" class="bg-secondary centered">
      <h1>Slide 2</h1>
      <order-show-item></order-show-item>
      <q-btn color="dark" glossy @click="$refs.modal.close()">Close Me</q-btn>
    </div>
    <div slot="slide" class="bg-tertiary centered">
      <h1>Slide 3</h1>
      <q-btn color="dark" glossy @click="$refs.modal.close()">Close Me</q-btn>
    </div>
  </q-carousel>

</q-modal>
       
      
        
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
         <q-progress :percentage="70" stripe animate style="height: 5px" />
              <span class="text-primary">iojerjf</span>

        </q-card-actions>
    </q-card>
      </q-modal>

        <div v-for="item in order.order_item">
          eeee
        </div>
      </div>
    </div>
  </q-modal-layout>
</q-modal>


</div>
</template>

<script>
import { QTransition, QModal, QModalLayout, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemTile, QItemMain, QItemSide, QCard, QCardTitle, QCardMain, QCardActions, QProgress, QCarousel, QScrollArea } from 'quasar'
import OrderShowItem from './OrderShowItem'
export default {
  components: {QTransition, OrderShowItem, QModal, QModalLayout, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemTile, QItemMain, QItemSide, QCard, QCardTitle, QCardMain, QCardActions, QProgress, QCarousel, QScrollArea},
  data () {
    return {
      order: {},
      owner: '',
      gallery: [
        'http://s1.picswalls.com/wallpapers/2015/12/12/awesome-beautiful-wallpaper_124413582_294.jpg',
        'http://www.technocrazed.com/wp-content/uploads/2015/12/beautiful-wallpaper-download-14.jpg',
        'http://images4.fanpop.com/image/photos/18500000/Beautiful-Color-roses-18577543-1280-800.jpg',
        'http://webneel.com/daily/sites/default/files/images/daily/07-2015/3-beautiful-peacock-photo-by-sibiar.preview.jpg'
      ]
    }
  },
  mounted: function () {
  },
  methods: {
    open () {
      this.$refs.page.open()
    },
    goBack: function () {
      this.$refs.page.close()
    },
    test: function () {
      let order = this.order.order_item
      let data = []
      let seller = {}
      console.log(order)
      data.push(seller)
      for (var i = 0; i < order.length; i++) {
        // order[i]
        let record = data.find(s => s.seller === order[i].post.user)
        console.log(record)
      }
    },
    init: function () {
      // let self = this
      // axios.get(window.apiUrl + '/orders/' + this.$route.params.number).then(function (res) {
      //   self.order = res.data
      //   // self.setData(self.order)
      //   console.log(self.seller)
      // }).catch(error => {
      //   if (error) {
      //   }
      // })
    }
  }
}
</script>

<style>
</style>
