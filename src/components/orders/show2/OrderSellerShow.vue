<!-- 
#
# to display single seller with his items and order details 
#
-->
<template>
<page ref="page">
<div slot="title">
    {{ title }}
</div>

<div slot="content">  
  			 <q-card  flat class="no-margin ">
        <q-card-title>
          <span>
            السعر
          </span>

          <div slot="right" class="row items-center text-primary">
             #4445
          </div>
        </q-card-title>
        <q-card-main>

		        <img src="http://lorempixel.com/200/200" style="width: 90px; height: 60px; margin: 2px;border-radius: 7px" v-for="(n, index) in 4" @click="goToItem(index)">
        </q-card-main>
        <q-card-separator />
        <q-card-actions >
        <q-progress :percentage="40" color="red" stripe animate style="height: 16px" />
        </q-card-actions>
    </q-card>

    <div class="bg-light">
    <h5 class="text-faded">order details</h5> 
    <q-scroll-area class="bg-light" style="height:50vh; width:100wh; padding-bottom: 50px">
     <table class="q-table horizontal-separator bg-white" style="width: 100%">
        <tbody>
          <tr v-for="n in 30">
            <td style="width: 25%">Item #1</td>
            <td class="text-right">{{n}}</td>
          </tr>
          </tbody>
        </table>
      </q-scroll-area>
      </div>   
        <div class="text-center fixed-bottom">
          <div >
                <q-btn color="primary"   round small   @click="lunch('orderChat')">
                  <q-icon name="chat" animate-bounce></q-icon>
                </q-btn>
            </div>
        </div>
</div>
</page>
</template>

<script>
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress, QScrollArea, QChip} from 'quasar'
import OrderSellerItems from './OrderSellerItems'
import OrderChat from './OrderChat'
export default {
  components: {OrderSellerItems, OrderChat, QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress, QScrollArea, QChip},
  data () {
    return {
      statusClass: 'bg-deep-orange-2'
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
    lunch (name) {
      this.$refs[name].open()
    },
    goToItem (id) {
      let itemPage = this.$refs.orderSellerItems
      console.log(id)
      itemPage.$refs.slide.goToSlide(id)
      this.lunch('orderSellerItems')
    }
  }
}
</script>

<style>
/*url(http://lorempixel.com/200/200);*/
.op{
  position: relative;
}
.bg-op{
  position: relative;
  margin: auto;
  width: 80px;
}
.bg-op:before{
    bottom: 0;
    content: '';
    position: absolute;
    opacity: .5;
    left: 0;
    right: 0;
    height: 40px;  
    width: 80px;
    border-top-left-radius: 160px; /* width * 2 */
    border-top-right-radius: 160px; /* width * 2 */
    /* background-image: linear-gradient(to top, rgba(0,0,0,1) 1% , rgba(255,255,255,0) 100%);*/
    background: gray;
   }
</style>
