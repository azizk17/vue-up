<!-- 
# many sellers in one order
# to display order info and seller list 
#
-->
<template>
<page ref="page">
<div slot="title">
    {{ title }}
</div>

<div slot="content"> 
      <router-link v-for="n in 7" :to="{name: 'orders.oneSeller', params: {username: 'frr', number: n}}" >
         <q-card  flat color="white" class=" card-border-round text-primary clickable" style="margin-bottom: 20px">
	        <q-card-title class="text-primary">
	          <span >
	            <img class="avatar" style="width:40px; height:40px" src="https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png">
	          </span>
	          <span>@username</span>

	          <div slot="right" class="row items-center text-primary">
	             #4445
	          </div>
	        </q-card-title>
	        <q-card-main >
		        <img src="http://s1.picswalls.com/wallpapers/2015/12/12/awesome-beautiful-wallpaper_124413582_294.jpg" style="width: 90px; height: 60px; border-radius: 7px">
		        <img src="http://www.technocrazed.com/wp-content/uploads/2015/12/beautiful-wallpaper-download-14.jpg" style="width: 90px; height: 60px; border-radius: 7px">
		        <img src="http://images4.fanpop.com/image/photos/18500000/Beautiful-Color-roses-18577543-1280-800.jpg" style="width: 90px; height: 60px; border-radius: 7px">
		        <img src="http://webneel.com/daily/sites/default/files/images/daily/07-2015/3-beautiful-peacock-photo-by-sibiar.preview.jpg" style="width: 90px; height: 60px; border-radius: 7px">
           
	        </q-card-main>
           <span class="text-primary">الطلب يتجهز</span>
          <q-progress :percentage="33"  color="green"  stripe animate style="height: 10px"/>
    	 </q-card>
       </router-link>
                 <span class="sp-line"></span>
</div>
</page>
</template>

<script>
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress} from 'quasar'
import OrderSellerShow from './OrderSellerShow'
export default {
  components: {OrderSellerShow, QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress},
  data () {
    return {
      title: 'الطلبات'
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
    lunch (name, params) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="scss">
.test-bg{
	  background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 80%);
}

</style>
