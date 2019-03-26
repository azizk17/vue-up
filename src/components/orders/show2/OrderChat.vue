<template>
<q-modal ref="page"  position="bottom"  :content-css="{minWidth: '100%', minHeight: '70%', direction: 'rtl'}">
<q-layout class="layout-padding bg-light">

<div>
	<q-item class="bg-blue-2 shadow-1" v-for="n in 6" style="margin-bottom: 14px; border-radius: 15px">
	    <q-item-main class="text-right">
	      <q-item-tile label>مثال توضيحي لطريقه عرض المحادثات</q-item-tile>
	      <q-item-tile sublabel>قبل نص ساعه</q-item-tile>
	    </q-item-main>
	  </q-item>
</div>
<div class="fixed-bottom shadow-up-3 bg-light">
	  <q-input 
	  v-model="chat"
	  placeholder="اكتب هنا"
	  :loading="sending"
	  :disable="sending"
	  :after="[
	    {
	      icon: 'arrow_back',
	      content: true,
	      handler () {
	        send()
	      }
	    }
	  ]"
	/>
	
	
</div>
</q-layout>
</q-modal>
</template>

<script>
import {TouchSwipe, QModal, QModalLayout, QToolbar, QBtn, QItem, QItemMain, QItemTile, QItemSide, QInput} from 'quasar'
export default {
  components: {QModal, QModalLayout, QToolbar, QBtn, QItem, QItemMain, QItemTile, QItemSide, QInput},
  directives: {TouchSwipe},
  data () {
    return {
      chat: '',
      sending: false
    }
  },
  methods: {
    open () {
      this.$refs.page.open()
    },
    send () {
      this.sending = true
      setTimeout(function () {
        this.sending = false
        this.chat = ''
      }.bind(this), 2000)
    }
  }
}
</script>

<style>

</style>
