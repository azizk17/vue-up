<!-- 
#
# to display seller items in single order
#
-->
<template>
<div>
<q-modal ref="page"  position="left"  :content-css="{minWidth: '100%', minHeight: '100%'}">
  <q-modal-layout>
  		<q-carousel  class="text-white full-height" ref="slide">
    <div slot="slide" class="bg-tertiary ">
         <order-seller-item-details></order-seller-item-details>
    </div>
    <div slot="slide" class="bg-secondary centered">
      <h1>Slide 2</h1>
      <q-btn color="dark" glossy @click="$refs.page.close()">Close Me</q-btn>
               <order-seller-item-details></order-seller-item-details>
    </div>
    <div slot="slide" class="bg-tertiary centered">
      <h1>Slide 3</h1>
      <q-btn color="dark" glossy @click="$refs.page.close()">Close Me</q-btn>
               <order-seller-item-details></order-seller-item-details>

    </div>
  </q-carousel>
  </q-modal-layout>
</q-modal>
</div>
</template>

<script>
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QCarousel} from 'quasar'
import OrderSellerItemDetails from './OrderSellerItemDetails'
export default {
  components: {OrderSellerItemDetails, QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QCarousel},
  data () {
    return {
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
    }
  }
}
</script>

<style>
</style>
