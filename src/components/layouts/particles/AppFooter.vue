<template>
 <div>
    <q-tabs align="justify">
    <q-route-tab
      icon="home"
      to="/"
      slot="title"
      replace
    />

    <q-route-tab
      icon="assignment"
      to="/orders"
      slot="title"
      replace
    />

   <!--  <div class="q-tab items-center justify-center" @click="openAddPost()">
    <button class="secondary circular" style="
    position: absolute;
    top: -8px;
    border: 1px solid #fff;
    border-radius: 90px;">
    <i style="font-size: 2.3rem">add</i>
</button>

    </div> -->
   
    
    <q-route-tab
      icon="shopping_cart"
      to="/cart"
      slot="title"
      replace
      />
    
  </q-tabs>

  <!-- <q-tabs v-model="selectedTab">
      <q-tab slot="title" name="tab-1" icon="message" />
      <q-tab slot="title" name="tab-2" icon="fingerprint" />
      <q-tab slot="title" name="tab-3" icon="account_box" />
      ...optional `QTabPane`s...
    </q-tabs> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {QTabs, QTab, QRouteTab} from 'quasar'
export default {
  components: {QTabs, QTab, QRouteTab},
  data () {
    return {
      selectedTab: 'tab-3'
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      AuthUser: 'auth/user'
    })
  },
  methods: {
    openAddPost () {
      if (!this.auth) {
        this.$router.push('/login')
        return false
      }
      // console.log(this.$refs.add_post)
    }
  }
}
</script>

<style lang="scss">
// .add_btn{
//   font-size: 35px
// }
// .q-tabs-icon{
//   font-size: 2rem;
// }
// .q-tab:active{
//   background: none;
//   i{
//     color: green;
//     font-size: 2rem;
 
//   }
// }

</style>
