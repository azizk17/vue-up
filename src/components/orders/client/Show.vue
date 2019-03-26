<template>
<page>
	<div slot="content">
		<q-card>
			<q-card-title>
				frf
			</q-card-title>
			<q-card-main>
				main
			</q-card-main>
		</q-card>
	</div>
</page>
</template>

<script>
import {QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress} from 'quasar'
export default {
  components: {QIcon, QBtn, QCard, QCardTitle, QCardMain, QCardActions, QProgress},
  data () {
    return {
      order: {}
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
