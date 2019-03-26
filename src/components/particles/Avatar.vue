<template>
<span>
<img :src="imgSrc" :style="styleObject" class="avatar no-shadow bg-grey-6">
</span>
</template>

<script>
import {QIcon} from 'quasar'
export default {
  props: ['src', 'height', 'width'],
  components: {QIcon},
  data () {
    return {
      styleObject: {
        height: this.height,
        width: this.width
      }
    }
  },
  computed: {
    imgSrc () {
      let path = window.apiUrl + '/user/avatar/' + this.src
      return this.src ? path : require('assets/avatar.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-green {
  border: 4px solid green;
}
</style>
