<template>
  <page>
 <span slot="title">
  {{ title }}
</span>
<div slot="hed-left">
    <q-btn :disable="loading" round color="light-blue-3" icon="save" small   @click="onSubmit()" class="no-shadow no-padding"/>
</div>
    <div slot="content">
      <!-- ####### swip image ########## -->
      <q-btn color="amber-4" @click="scroll()" icon="alert"/>
    <q-scroll-area ref="scroll" style="width: 400px; height: 500px;" class="bg-yellow">
      <div style="margin-top: 150px"></div>
      <div style="margin-bottom: 25px" v-for="n in 10">{{n}} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <q-btn>Click</q-btn></div>
    </q-scroll-area>
       <div>
         <q-btn color="primary" @click="sendReq()">test</q-btn>
         <q-btn color="red-6" @click="getData()">get</q-btn>
       </div>
      <!-- #################### loader #################### -->
      <q-inner-loading :visible="loading">
        <q-spinner-mat size="50px" color="blue-4" />
      </q-inner-loading>
    </div>
  </page>
</template>

<script>
import {QIcon, QBtn, Toast, QInput, QField, QSpinnerOval, QChip, QTooltip, QInnerLoading, QSpinnerMat, QScrollArea, scroll} from 'quasar'
import {mapGetters} from 'vuex'
import axios from 'axios'
const { setScrollPosition } = scroll
export default {
  components: {QIcon, QBtn, Toast, QInput, QField, QSpinnerOval, QChip, QTooltip, QInnerLoading, QSpinnerMat, QScrollArea},
  data () {
    return {
      title: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      items: 'cart/cartProducts'
    })
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  methods: {
    sendReq () {
      axios.post(window.apiUrl + '/test/event').then(function (res) {
        console.log(res)
      })
    },
    scroll () {
      setScrollPosition(this.$refs.scroll, 400, 2)
      // this.$refs.scroll.setScrollPosition(125)
    },
    getData () {
      window.Echo.channel('market')
        .listen('Markets.UpdateMarketStatus', (e) => {
          console.log('eeeeee', e)
        })
    }
  }
}
</script>

<style lang="scss" scopped>
.img-container {
    float: right;
    position: relative;
    padding: 5px;
    & img {
      width: 70px;
      height: 70px;
      border-radius: 7px;
    }
}
.img-order {
    position: absolute;
    margin: 0 auto;
    background: red;
    height: 17px;
    width: 17px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    text-align: center;
}

.img-remove {
    position: absolute;
    bottom: 0; left: 0; top: 0; right:0;
    margin: 0 auto;
    text-align: center;
}
</style>
