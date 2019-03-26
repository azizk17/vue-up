<template>
          <router-view></router-view>
</template>

<script>
import {QTransition, QLayout, QBtn, QIcon, QList, QItem, QItemMain, QListHeader, QItemSide, QItemTile, QItemSeparator} from 'quasar'

export default{
  components: { QTransition, QLayout, QBtn, QIcon, QList, QItem, QItemMain, QListHeader, QItemSide, QItemTile, QItemSeparator },
  data () {
    return {
      title: 'الاعدادت',
      canGoBack: true,
      transition: {
        enter: 'fadeIn',
        leave: 'fadeOut'
      },
      childTransition: {
        enter: 'fadeInRightBig',
        leave: 'fadeOut',
        duration: 999
      }
    }
  },
  created: function () {
  },
  mounted () {
    this.$emit('id-selected', 1)
  },
  watch: {
    '$route' (to, from) {
      this.changTitle()
    }
  },
  methods: {
    goBack () {
      window.history.back()
    },
    changTitle () {
      let self = this
      this.$bus.$on('account-title', function (title) {
        self.title = title
      })
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

</style>
