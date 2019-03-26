<template>
</template>

<script>
import { Loading } from 'quasar'
import {mapActions} from 'vuex'
import authService from '../../services/authService'

export default {
  mounted: function () {
    this.init()
  },
  methods: {
    ...mapActions({
      logout: 'auth/remove'
    }),
    init: function () {
      Loading.show({
        message: 'تسجيل الخروج',
        spinner: 'dots',
        spinnerSize: 60
      })
      let self = this
      authService.logout().then(function (res) {
        Loading.hide()
        self.$router.push('/')
      })
    }
  }
}

</script>
