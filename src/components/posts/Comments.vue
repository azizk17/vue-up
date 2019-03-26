<template>
<!--   <div>
  	<span class="text-grey-5" v-if="comments.length === 0">لا يوجد تعليقات</span>
		<div  v-for="(comment, index) in comments" style="padding: 2px 0px">
		  <div v-if="index <= 1">
			<span>
			   <span class="text-bold">{{ comment.user.username }}</span> &nbsp;
			   <span> {{ comment.comment}} </span>
		   </span> -->
		  <!-- </div>
		</div>
  </div> -->
 <q-modal ref="comments" class="maximized">
  <q-layout>
  <!-- Header -->
  <div slot="header" class="toolbar">
  <button  @click="$refs.comments.close()">
      <i>keyboard_arrow_right</i>
    </button>

    <q-toolbar-title :padding="1">
      التعليقات
    </q-toolbar-title>

  </div>

  <div class="layout-view ">
    <div class="box" style="padding: 16px 13px">
  		<span class="text-grey-5" v-if="allComments.length === 0">لا يوجد تعليقات</span>
		<div  v-for="(comment, index) in allComments" style="padding: 2px 0px">

			<span >
			   <router-link class="text-bold pull-right" :to="{name: 'user.profile', params: {username: comment.user.username}}">{{ comment.user.username }}</router-link> &nbsp;
			   <span> {{ comment.comment}} </span>
		   </span> 
		</div>
  </div>
  </div>

   <!-- Footer -->
  <div slot="footer" class="toolbar">
  	  <form class="full-width row small-gutter" @submit.prevent="onSubmit()">
  		<div class="width-3of3">
		 <input name="comment" v-model.lazy="form.comment" class="no-border" placeholder="اضف تعلق" :class="{'has-error': $v.form.comment.$error}">
  		</div> 
  		<div class="width-1of5 text-center">
  			<button class="clear small" v-if="!form.submitting">
  				<span>اضف</span> 
  			</button>
  			<spinner v-if="form.submitting" :size="30" name="dots"></spinner>
  		</div> 				
  	  </form>
  	
  </div>
</q-layout>
</q-modal>
</template>

<script>
import Form from '../../utils/Form'
import { mapGetters } from 'vuex'
// import authService from '../../services/authService'
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['comments', 'post'],
  data () {
    return {
      allComments: {},
      form: new Form({
        post: this.post,
        comment: ''
      })
    }
  },
  validations: {
    form: {
      comment: { required }
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user',
      auth: 'auth/auth'
    })
  },
  created: function () {
    this.allComments = this.comments
  },
  methods: {
    onSubmit () {
      let self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      console.log(this.post)
      self.form.submitting = true
      this.form.post(window.apiUrl + '/posts/' + self.post.key + '/comments/create').then(function (res) {
        // self.$refs.comments.close()
        self.allComments.push(res)
        self.form.comment = ''
        self.$v.form.$reset()
      }).catch(res => {
        self.form.errors = res.error
      })
    }
  }
}
</script>

<style>
</style>
