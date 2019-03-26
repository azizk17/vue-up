<template>
  <div class="box">
  <div class="contnet" style="padding: 13px 16px ">
  	<h5>{{contnet.title}}</h5>
  	<p>{{contnet.text}}</p>  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contnet: {
        title: 'شروط الاستخدام',
        text: 'النص النص النص النص النص النلص النص النص النص'
      }
    }
  },
  created: function () {

  },
  methods: {
    initData: function () {
    }
  }
}
</script>

<style>
</style>
