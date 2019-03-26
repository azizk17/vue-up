<template>
	<div class="toolbar">
    <button @click="goBack">
      <i>chevron_right</i>
    </button>

      <q-toolbar-title :padding="0">
        {{ title }}
      </q-toolbar-title>

	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    ...mapGetters({
    }),
    ...mapActions({
    }),
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>
