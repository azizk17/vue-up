<template>
<page>
<span slot="title">
  {{ title }}
</span>

<div slot="content">
<!--  <q-list class="scroll" no-border style="min-width: 100px">
      <div v-for="ls in listClick">
        <q-list-header style="padding:0 10px">{{ ls.title }}</q-list-header>
              <q-item link v-for="item in ls.items" :key="item" @click="lunch(item.click)"  style="text-align:right">
               <q-item-side>
                  <q-item-tile :icon="item.icon"  />
                </q-item-side>
                <q-item-main :label="item.text" />   
              </q-item> 
      </div>
  </q-list> -->
  <div class="edit-avatar">
     <edit-avatar></edit-avatar>
  </div>
   <q-list inset-separator no-border  v-for="ls in listLink" class="no-margin" >

        <q-list-header style="padding:0 10px">{{ ls.title }}</q-list-header>
              <q-item link  v-for="item in ls.items"  :to="item.link"  style="text-align:right" class="no-padding">
                <q-item-main :label="item.text" />
                <q-item-side>
                  <q-item-tile :icon="item.icon" color="grey-5" />
                </q-item-side>
              </q-item>
  </q-list>
  <q-list class="scroll" no-border style="min-width: 100px">
      <div v-for="ls in listLink2">
        <q-list-header style="padding:0 10px">{{ ls.title }}</q-list-header>
              <q-item link  v-for="item in ls.items"  :to="item.link"  style="text-align:right">
                <q-item-main :label="item.text" />
                <q-item-side>
                  <q-item-tile :icon="item.icon" color="grey-5" />
                </q-item-side>
              </q-item>
      </div>
  </q-list>

<!-- inner pages -->
<!-- <edit-password ref="password"></edit-password>
<edit-account ref="account"></edit-account>
<edit-profile ref="profile"></edit-profile>
<market-settings ref="market-settings"></market-settings>
<market-location ref="market-location"></market-location> -->
</div>
</page>
</template>

<script>
import { mapGetters } from 'vuex'
import {QTransition, QLayout, QBtn, QIcon, QList, QItem, QItemMain, QListHeader, QItemSide, QItemTile, QItemSeparator} from 'quasar'
import EditAvatar from './EditAvatar'
export default{
  components: { QTransition, QLayout, QBtn, QIcon, QList, QItem, QItemMain, QListHeader, QItemSide, QItemTile, QItemSeparator, EditAvatar
  },
  data () {
    return {
      title: 'الاعدادت',
      canGoBack: true,
      transition: {
        enter: 'fadeIn',
        leave: 'fadeOut'
      },
      listLink: [
        {
          title: 'الحساب',
          items: [
            {
              icon: 'account_circle',
              text: 'الصفحه الشخصيه',
              link: {name: 'user.edit.profile', params: {username: this.$route.params.username}}
            },
            {
              icon: 'alarm',
              text: 'كلمه السر',
              link: {name: 'user.edit.password', params: {username: this.$route.params.username}}
            },
            {
              icon: 'location_on',
              text: 'الحساب',
              link: {name: 'user.edit.account', params: {username: this.$route.params.username}}
            }
          ]
        },
        {
          title: 'المتجر',
          items: [
            {
              icon: 'store',
              text: 'اعدادت المتجر',
              link: {name: 'user.edit.market.settings', params: {username: this.$route.params.username}}
            }
          ]
        }
      ], // list array
      listLink2: [
        {
          title: 'عن رزق',
          items: [
            {
              icon: '',
              text: 'من نحن',
              link: {name: 'user.edit.profile', params: {username: this.$route.params.username}}
            },
            {
              icon: '',
              text: 'الشروط والاحكام',
              link: {name: 'user.edit.account', params: {username: this.$route.params.username}}
            },
            {
              icon: '',
              text: 'راسلنا',
              link: {name: 'auth.logout'}
            }
          ]
        },
        {
          title: 'الحساب',
          items: [
            {
              icon: '',
              text: 'تسجيل الخروج',
              link: '/logout'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user'
    })
  },
  created: function () {
  },
  mounted () {
    this.$bus.$emit('account-title', this.title)
  },
  methods: {
    goBack () {
      window.history.back()
    },
    lunch (name) {
      console.log(this.$refs[name])
      this.$refs[name].open()
    },
    test () {
      // this.$parent.$options.parent.$refs.header.title = 'eferf erg erg '
    }
  }
}

</script>
<style lang="scss" scoped>
  .box{
    .content{
      padding: 16px 0;
    }
    p{
      padding: 0 13px;
      margin: 10px;
    }
    .list{
      width: 100%;
      text-align: right;
      border-right: none;
      border-left: none;
    }
    .item{
      hr:first-child{
        visibility: hidden;;
      }
      .item-secondary{
        left: 4px;
        right: initial;
      }
      .item-primary{
        right: 4px;
        left: initial;
      }
      *{
        text-align: right;
      }
    }
    
  }
  .edit-avatar{
    background: 40%;
    border-bottom: 1px solid #e0e0e0;
    padding: 7px;
  }
  

</style>
