<template>
  <page>
  	<div slot="title">
  		{{title}}
  	</div>
  	<div slot="content">
  		<q-field label="الاسم" >
              <q-input v-model.lazy="name" class="text-right" align="right"  :disabled="loading"/>
                <div class="q-field-bottom row no-wrap">
                </div>
            </q-field>
            <q-field label="رسالتك" >
              <q-input v-model.lazy="body" class="text-right" align="right" type="textarea" :max-height="100"
  :min-rows="7" :disabled="loading"/>
                <div class="q-field-bottom row no-wrap">
                </div>
            </q-field>
            <div class="text-center">
                <q-btn color="primary" @click="onSubmit()" class="no-shadow" :disabled="loading"> ارسال </q-btn>
            </div>
            <q-inner-loading :visible="loading">
		       <q-spinner-mat size="99px" color="blue-4" />
		    </q-inner-loading>
  	</div>
  </page>
</template>

<script>
import {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat} from 'quasar'
export default {
  components: {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat},
  data () {
    return {
      title: 'تواصل معنا',
      loading: false,
      name: '',
      body: ''
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      setTimeout(function () {
        this.loading = false
      }.bind(this), 2000)
    }
  }
}
</script>

<style>
</style>
