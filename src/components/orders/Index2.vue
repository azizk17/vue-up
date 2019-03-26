<template>
<page>
	<div slot="content">
		<div v-if="orders.length === 0" class="text-center" style="padding-top: 30%">
			<span class="text-faded">
				لايوجد طلبات
			</span>
		</div>
		<q-card v-for="order in orders" color="white" class="no-shadow text-dark">
			<q-card-title>
				<span class="text-dark pull-left" style="font-size: 24px">#{{ order.number }}</span>
				<span class="text-primary"> {{ order.price }}</span>
				<span class="text-faded" style="font-size: 80%">ريال</span>

				<!-- client orders  -->
				<div v-if="!order.client" class="pull-left">
					<q-icon name="notifications" color="orange-5" size="30px"/>
				</div>
			</q-card-title>
			<q-card-main>
			<div v-for="items in order.order_item" class="text-dark row">
				<div class="col" >
				<span v-for="item in items">
				<span v-for="(media, index) in item.media" @click="test()">
					<img :src="imgPath('low', media.filename)" class="img-thumb" v-if="index === 0">
				</span>
				</span> 
				<span v-if="n === 5">
					more 
				</span>
				</div>
			</div>
		   </q-card-main>
		   <q-card-main v-if="!order.client">
		   <q-item class="no-padding no-margin">
			   	<q-item-main class="text-right">
			   	<avatar :src="order.user.avatar" height="25px" width="25px"></avatar>
<!-- 			   	<span class="text-faded">{{order.user.username}}@</span>
 -->			   	</q-item-main>
			   
		   </q-item>
		   </q-card-main>
		   <q-card-main v-if="order.client">
			   <q-item class="no-padding no-margin">
				   	<q-item-main class="text-right">
				   	<div v-for="p in order.order_item" class="text-dark">
				   		<avatar  :src="p.seller.avatar" height="25px" width="25px"></avatar>
				   	</div>
				   	</q-item-main>
				   		<q-item-side>
			   	<q-icon v-if="order.client" name="reply" color="grey-5" size="34px" class="pull-left"/>
			   	</q-item-side>
			   </q-item>
		   </q-card-main>

	
		</q-card>
	</div>
</page>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
import {QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress, QItem, QItemMain, QItemSide} from 'quasar'
export default {
  components: {QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress, QItem, QItemMain, QItemSide},
  data () {
    return {
      orders: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/user'
    })
  },
  mounted () {
    this.fetch()
    console.log('frfrfr')
  },
  methods: {
    test () {
      console.log(this.orders)
    },
    imgPath: function (quality, filename) {
      return window.apiUrl + '/posts/media/' + quality + '/' + filename
    },
    fetch () {
      let self = this
      axios.get(window.apiUrl + '/orders/' + this.auth.username + '/all').then(function (res) {
        self.filterData(res.data)
      }).catch(error => {
        if (error) {
        }
      })
    },
    filterData (items) {
      var sellerOrders = items.sellerOrders.map(function (item, index, array) {
        return item
      })
      var clientOrders = items.clientOrders.map(function (item, index, array) {
        return item
      })
      let all = sellerOrders.concat(clientOrders)
      let b = all.sort(function (a, b) {
        return a.created_at.localeCompare(b.created_at)
      })
      this.orders = b
    }
  }
}
</script>

<style lang="scss" scoped>
.img-thumb {
	border-radius: 9px;
	height: 50px;
	width: 50px;
	padding: 2px;
}
</style>
