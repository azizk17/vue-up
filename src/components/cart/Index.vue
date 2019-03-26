<template>
<div>

<div v-if="items.length === 0" class="cart-empty text-center">
  <p class="text-grey-5" style="font-size: 1.7em">السله فارغه</p>
  <q-icon name="shopping_cart" size="250px" color="grey-2"/>
</div>
<div v-else="items">
<div class="top-bar ">
<q-item class="no-padding">
        <q-item-side>
      <q-item-tile label>الاجمالي : </q-item-tile>
      </q-item-side>
    <q-item-main class="text-right">
            <q-item-tile label> 
            <span class="text-primary text-bold" style="font-size: 1.7em">{{ cartInfo.price }}</span> 
            <span class="text-gray">ريال</span>
            </q-item-tile>
    </q-item-main>
    <q-item-side>
       <q-btn  color="primary"  @click="onSubmit()" class="no-shadow">
         <span>شراء</span>
       </q-btn>
      </q-item-side>
  </q-item>
</div>

<cart-item v-for="item in items" :item="item"></cart-item>



</div>
    <q-inner-loading :visible="loading">
       <q-spinner-mat size="99px" color="blue-4" />
    </q-inner-loading>
</div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Form from '../../utils/Form.js'
import axios from 'axios'
import CartItem from './CartItem'
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QCard, QCardMedia, QCardMain, QCardTitle, QItem, QItemTile, QItemMain, QItemSide, QBtn, QCollapsible, QInput, QList, QItemSeparator, QTransition, QIcon, QInnerLoading, QSpinnerMat} from 'quasar'
export default{
  components: {CartItem, QModal, QModalLayout, QToolbar, QToolbarTitle, QCard, QCardMain, QCardMedia, QCardTitle, QItem, QItemTile, QItemMain, QItemSide, QBtn, QCollapsible, QInput, QList, QItemSeparator, QTransition, QIcon, QInnerLoading, QSpinnerMat},
  data () {
    return {
      loading: false,
      text: 'dsfee',
      commentFrom: new Form({
        comment: ''
      })
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/user',
      items: 'cart/cartProducts',
      isAddToCart: 'cart/isAdded'
    }),
    cartInfo: function () {
      let info = {
        quantity: 0,
        price: 0
      }
      for (var i = 0; i < this.items.length; i++) {
        let itemPrice = this.items[i].quantity * this.items[i].product.price
        info.quantity += this.items[i].quantity
        info.price += itemPrice
      }
      return info
    }
  },
  created () {
    this.getCartItems()
  },
  methods: {
    ...mapActions({
      add: 'cart/addToCart',
      emptyCart: 'cart/emptyCart',
      setCartItems: 'cart/setCartItems'
    }),
    getCartItems () {
      let self = this
      const path = window.apiUrl + '/cart/added'
      axios.get(path).then(function (res) {
        self.setCartItems(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit () {
      let data = {
        items: this.items
      }
      let self = this
      this.loading = true
      axios.post(window.apiUrl + '/orders/create', data).then(function (res) {
        self.loading = false
        self.emptyCart()
      }).catch(error => {
        if (error) {
          self.loading = false
        }
      })
    }
  }
}
</script>

<style type="scss" scoped>
	.q-item-link, .q-input-target{
    text-align: right;
  }
  .list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.top-bar{
  background: #f6f6f6;
  position: relative;
  width: 100%;
  height: 40px;
  padding: 40px 7px;
}
.bar-item {
    display: block;
  }
.cart-item-img{
  height: 110px;
}
.q-card-media-overlay {
    color: #fff;
    background: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.7));
}
.cart-empty{
  padding: 100px 13px;
}

.no-allow-item {
   background: linear-gradient(to bottom, rgba(169, 17, 17, 0), rgba(253, 253, 253, 0.7));
}



</style>
