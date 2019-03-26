<template>
<q-modal ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}" position="bottom"  @close="goBack()">
  <q-modal-layout>
    <div class="layout-padding" style="direction: rtl">
      <div class="row">
      	<div class="col-6 ">رقم الجوال</div>
      	<div class="col-6">٠٤٤٤٤٤</div>
      </div>
    </div>
  </q-modal-layout>
</q-modal>
</template>

<script>
import { QModal, QModalLayout, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemMain, QItemSide } from 'quasar'
export default {
  components: {QModal, QModalLayout, QIcon, QBtn, QRating, QList, QListHeader, QItem, QItemMain, QItemSide},
  data () {
    return {}
  },
  methods: {
    goBack: function () {
      this.$router.replace({ name: 'user.profile', params: {username: this.$route.params.username} })
    }
  },
  mounted: function () {
    this.$refs.layoutModal.open()
  }
}
</script>
