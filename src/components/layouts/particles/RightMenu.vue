<template>
<div>
	<q-list no-border link inset-separator class="text-center" v-if="auth">
  <!-- <q-item class="text-center">
    <q-item-main>
       <img  class="avatar" v-if="user.avatar" :src="post.user.avatar" style="width:120px; height: 120px">
       <img  class="avatar" v-if="!user.avatar" src="~assets/avatar.png" style="width:120px; height: 120px">
    </q-item-main>
  </q-item> -->


     <q-side-link v-if="hasMarket" item :to="{name: 'user.edit.market.settings', params: {username: user.username} }" class="text-right">
       <q-item-side>
        <q-toggle :value="stat" @change="setMarketStatus(user)"/>
       </q-item-side>
       حال المتجر
      <q-item-main />
    </q-side-link>
     <q-side-link item :to="{name: 'user.settings', params: {username: user.username} }" class="text-right">
      <!-- <q-item-side icon="rss feed" /> -->
       <q-item-side icon="settings" />
      <q-item-main label="الاعدادات" />
    </q-side-link>
    <q-side-link item :to="{name: 'user.profile', params: {username: user.username} }" class="text-right">
      <!-- <q-item-side icon="rss feed" /> -->
       <q-item-side icon="person_pin" /> 
      <q-item-main label="صفحه العرض" />
    </q-side-link>
    <q-side-link item :to="{name: 'user.edit.market.settings', params: {username: user.username} }" class="text-right">
      <!-- <q-item-side icon="rss feed" /> -->
       <q-item-side icon="perm_data_setting" />
      <q-item-main label="اعدادت المتجر" />
    </q-side-link>
    <!-- <q-side-link item :to="{name: 'user.account', params: {username: user.username} }" class="text-right">
      <q-item-side icon="rss feed" />
       <q-item-side icon="notifications_active" />
      <q-item-main label="التنبيهات" />
    </q-side-link> -->

      <q-item class="text-right" link :to="{name: 'orders'}"> 
              <q-item-side icon="style" />
        <q-item-main>
          <span>الطلبات</span>
        </q-item-main>
      </q-item>
      <q-item class="text-right" link :to="{name: 'posts.add'}" style="margin-top: 50px"> 
        <q-item-main class="text-center">
          <q-btn round color="primary"  class="no-shadow" icon="add"/>
          <span class="block">اضف منتج</span>
        </q-item-main>
      </q-item>
      <!-- logout -->

      <!-- ############  Guests Menu ############## -->
    </q-list>
      <q-list no-border link inset-separator class="text-center" v-if="!auth">
        <q-item class="text-right" link :to="{name: 'pages.contact'}"> 
              <q-item-side icon="mail_outline" />
        <q-item-main>
          <span>راسلنا</span>
        </q-item-main>
      </q-item>
      <q-item class="text-right" link :to="{name: 'pages.about'}"> 
              <q-item-side icon="call_made" />
        <q-item-main>
          <span>عن رزق</span>
        </q-item-main>
      </q-item>
      <q-item class="text-right" link :to="{name: 'auth.login'}"> 
              <q-item-side icon="account_circle" />
        <q-item-main>
          <span>تسجيل الدخول</span>
        </q-item-main>
      </q-item>
      </q-list>

</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {QIcon, QBtn, QSideLink, QList, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QToggle} from 'quasar'
export default {
  components: {QIcon, QBtn, QSideLink, QList, QItem, QItemSide, QItemMain, QItemTile, QItemSeparator, QToggle},
  data () {
    return {
      storeStatuts: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      auth: 'auth/auth',
      marketStatus: 'market/getStatus',
      hasMarket: 'market/hasMarket'
    }),
    stat () {
      if (this.hasMarket) {
        let a = Boolean(this.marketStatus)
        return a
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      setMarketStatus: 'market/setStatus'
    }),
    test () {
      console.log(this.user)
    }
  }
}
</script>
