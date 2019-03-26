<!-- 
#
#     user has many active orders 
#
 -->
<template>
<page ref="page">
<div slot="title">
{{title}}
</div>
<div slot="content">

<router-link v-for="n in 3" :to="{name: 'orders.show', params: {number: n}}" >
<q-card  flat color="white" class="card-border-round text-primary clickable" >
  <q-card-title>
    <span class="text-primary"> 555 ريال</span>

    <div slot="right" class="row items-center text-primary">
       #4445
    </div>
  </q-card-title>
  <q-card-main>
    <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
    <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
    <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
    <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
  </q-card-main>
  <q-card-separator />
   <q-progress :percentage="progress" stripe animate style="height: 40px" />

</q-card>
</router-link>
  <router-link tag="div" class="item text-right" v-for="order in orders" :to="{name: 'orders.show', params: {number: order.number}}">
         <div class="item-content has-secondary text-right" v-for="items in order.order_item">
         <!-- owner of item info -->
<!--           <div v-for="item in items.post" class="row inline">
            <img class="item-primary avatar" src="~assets/avatar.png">
            <span>{{item.user.name}}</span>
          </div> -->
        </div>
        <div class="item-primary" style="left:13px">#{{ order.number }}</div>
    </router-link>

  </div>
</page>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
import {QTransition, QModal, QModalLayout, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress} from 'quasar'
export default {
  components: {QTransition, QModal, QModalLayout, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress},
  data () {
    return {
      orders: {},
      progress: 40
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/user'
    })
  },
  mounted: function () {
    this.init()
  },
  methods: {
    open () {
      this.$refs.page.open()
    },
    goBack () {
      this.$refs.page.close()
    },
    init: function () {
      let self = this
      axios.get(window.apiUrl + '/orders/' + this.auth.username + '/active').then(function (res) {
        self.orders = res.data
      }).catch(error => {
        if (error) {
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
