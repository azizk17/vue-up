<template>

<q-card   class="full-width items-center card-border-round" flat v-touch-hold="userHold" style="padding: 2px 13px">
  <q-card-media style="height: 140px" overlay-position="full" >
    <q-card-title slot="overlay" v-if="!custom">
    <!-- <span class="text-white" style="font-size: 1.5em">{{ item.product.description }}</span>
    <q-icon name="delete_forever" size="24px" class="pull-left" @click="removeFromCart(item.product)" style="z-index: 2; position: relative"/>
    <div v-if="item.product.user.market.available">
          <q-icon name="add_circle" size="24px" @click="upQuantity(item.product)"/>
          <span  style="font-size: 1.6em">x{{item.quantity }}</span>
          <q-icon name="remove_circle" size="24px" @click="downQuantity(item.product)"/>
    </div>
    <div v-if="!item.product.user.market.available" style="z-index: 2; position: relative">
      <span class="text-red-7">المتجر مغلق</span> 
      <q-icon name="error" color="red-7" size="24px" />
       <span class="text-faded " style="font-size: 60%">لايمكنك شراءه الان</span>
    </div>
        <div >
           <avatar :src="item.product.user.avatar" height="25px" width="25px"></avatar>
            <span class="text-primary">{{ item.product.user.username }}@</span>
            <span class="pull-left">ريال</span>
            <span class="pull-left" style="font-size: 2.5em">{{item.product.price * item.quantity}}</span>
            <span class="pull-left block">freomf er</span>
        </div> -->
        <div class="row" style="height: 600px">
        	<div class="col">
        		<avatar :src="item.product.user.avatar" height="25px" width="25px"></avatar>
            	<span class="text-primary">{{ item.product.user.username }}@</span>
                <span class="text-white block" style="font-size: 1.5em">{{ item.product.description }}</span>
                <div class="row">
                  <q-icon name="add_circle" size="24px" @click="upQuantity(item.product)"/>
		          <span  style="font-size: 1.6em">x{{item.quantity }}</span>
		          <q-icon name="remove_circle" size="24px" @click="downQuantity(item.product)"/>
                </div>
        	</div>
        	<div class="col text-left">
        		<q-icon name="delete_forever" size="24px"  @click="removeFromCart(item.product)" style="z-index: 2; position: relative"/>
        		<div class="row lg-gutter">
        		    <span style="font-size: 200%">{{item.product.price * item.quantity}}</span>
        		    <span style="font-size: 70%">ريال</span>
        		</div>
        		<div class="bottom-left"  @click="custom = !custom">
        			<span class="pull-left text-amber-5" style="font-size: 80%">تخصيص</span>
        			<q-icon name="edit" size="20px" color="amber-6"/>
        		</div>
        	</div>
        </div>

  </q-card-title>

  <q-card-title slot="overlay" v-if="custom"  class="no-padding">
  	 <div class="bg-grey-6 close-btn">
  	 	<q-icon name="expand_less" size="24px" color="grey-2" @click="custom = !custom"/>
  	 </div>
        	<div class="custom-messages-box">
        		<q-scroll-area ref="scroll" style="height: 110px;">
				  <div v-for="msg in item.messages">
				    <div class=" msg text-dark" style="padding: 3px; margin: 5px 0">
				    	<span>{{ msg }}</span>
				    	<q-icon name="close" size="14px" color="grey-6" @click="deleteMessageFromCartItem(item, msg)"/>
				    </div>
				  </div>
				</q-scroll-area>
			  </div>
        	<div class="add-custom">
        		<div class="row">
        			<div class="col-11">
        			<q-input type="text" v-model="message" align="right" style="padding: 0px 5px" class="no-margin no-padding" placeholder="اكتب هنا"/>
        			</div>
        			<div class="col-1 text-left">
        				<q-icon name="save" size="22px" color="primary" style="align-items: center; position: absolute; top: 3px;left: 10px;" @click="addMessageToCartItem(item)"/>
        			</div>
        		</div>
        		<q-item algin="right" class="no-padding no-margin" >
        			<q-item-main class="no-padding no-margin">
        			</q-item-main>
        			<q-item-side>
        				
        			</q-item-side>
        		</q-item>
        	</div>
  </q-card-title>
  

    <img :src="item.product.media[0].filename">

  </q-card-media>

</q-card>
</template>

<script>
import {QIcon, QBtn, QCard, QCardMedia, QCardMain, QCardTitle, QItem, QItemTile, QItemMain, QItemSide, QInput, QScrollArea, TouchHold} from 'quasar'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {QIcon, QBtn, QCard, QCardMedia, QCardMain, QCardTitle, QItem, QItemTile, QItemMain, QItemSide, QInput, QScrollArea},
  props: ['item'],
  directives: {TouchHold},
  data () {
    return {
      title: '',
      loading: false,
      custom: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
  },
  mounted () {
    this.interactive()
  },
  methods: {
    ...mapActions({
      removeFromCart: 'cart/removeFromCart',
      upQuantity: 'cart/upQuantity',
      downQuantity: 'cart/downQuantity',
      updateMarketStatus: 'cart/updateMarketStatus',
      addMessage: 'cart/addMessage',
      deleteMessage: 'cart/deleteMessage'
    }),
    userHold (obj) {
      console.log(obj.evt.target.closest('.q-card'))
      let ele = obj.evt.target.closest('.q-card')
      ele.className += ' animate-bounce'
    },
    scroll () {
      this.$refs.scroll.setScrollPosition(20)
    },
    addMessageToCartItem (item) {
      let obj = {item: item, message: this.message}
      this.addMessage(obj)
      this.message = ''
      // this.scroll()
    },
    deleteMessageFromCartItem (item, message) {
      let obj = {item: item, message: message}
      this.deleteMessage(obj)
    },
    interactive () {
      let self = this
      window.Echo.channel('market.' + this.item.product.user.market.id)
        .listen('Markets.UpdateMarketStatus', (e) => {
          self.updateMarketStatus(e)
        })
    }
  }
}
</script>

<style lang="scss" scopped>
.custom-box {
	position: relative;
	width: 100%;
	height: 140px;
	padding: 0 5px;
	margin: 0;
}
.add-custom {
	position:relative;
	width: 100%;
	left: 0;
	padding: 5px 13px;
	background:rgba(255,255,255,.8);
}
.msg {
  background:rgba(202, 249, 169, .8);
  border-radius: 5px;

}
.custom-messages-box {
	padding: 0 5px;
}
.close-btn {
	position: absolute;
	top:0;
	left: 0;
	z-index: 1;
	border-bottom-right-radius: 7px
}
</style>
