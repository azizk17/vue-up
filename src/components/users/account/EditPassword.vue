<template>
<page>
<span slot="title">
  {{ title }}
</span>
<div slot="hed-left">
    <q-btn :disable="form.submitting" round color="light-blue-3" icon="save" small   @click="onSubmit()" class="no-shadow no-padding"/>
</div>
<div slot="content">

    <form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown="form.errors.clear($event.target.name)">

     <div class="text-negative" v-if="form.errors">
        <p :class="errorClass" > {{ form.errors.message }}</p>
     </div>
     <q-field label="كلمه السر الحاليه" :error="$v.form.currentPassword.$error" >
      <q-input v-model.lazy="form.currentPassword" align="right" :disable="form.submitting"/>
        <div class="q-field-bottom row no-wrap">
          <div class="q-field-error col text-negative " v-if="$v.form.currentPassword.$error">
            <span v-if="!$v.form.currentPassword.required">فضلا ادخل كلمه المرور الحاليه</span>
            <span v-if="!$v.form.currentPassword.minLength">سته خانات على الاقل</span>
          </div>
        </div>
    </q-field>
    <q-field label="كلمه السر الجديده" :error="$v.form.newPassword.$error" >
      <q-input v-model.lazy="form.newPassword" class="text-right" align="right" :disable="form.submitting"/>
        <div class="q-field-bottom row no-wrap">
          <div class="q-field-error col text-negative " v-if="$v.form.newPassword.$error">
            <span v-if="!$v.form.newPassword.required">فضلا ادخل كلمه المرور الحاليه</span>
            <span v-if="!$v.form.newPassword.minLength">سته خانات على الاقل</span>
          </div>
        </div>
    </q-field>
    <q-field label="اعاده كلمه السر الجديده" :error="$v.form.repeatNewPassword.$error" >
      <q-input v-model.lazy="form.repeatNewPassword" align="right" :disable="form.submitting"/>
        <div class="q-field-bottom row no-wrap">
          <div class="q-field-error col text-negative " v-if="$v.form.repeatNewPassword.$error">
            <span v-if="!$v.form.repeatNewPassword.sameAs">فضلا ادخل كلمه المرور الحاليه</span>
          </div>
        </div>
    </q-field>
   </form>
    <q-inner-loading :visible="form.submitting">
    <q-spinner-gears size="50px" color="blue-4" />
  </q-inner-loading>
  </div>
</page>
</template>

<script>
import Form from '../../../utils/Form.js'
import { mapGetters, mapActions } from 'vuex'
// import authService from '../../services/authService'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QField, QInput, QInnerLoading, QSpinnerGears} from 'quasar'

export default {
  components: { QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QField, QInput, QInnerLoading, QSpinnerGears },
  data () {
    return {
      title: 'تغيير كلمه السر',
      errorClass: 'animated bounceIn',
      disable: false,
      form: {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user'
    })
  },
  mounted: function () {
    this.init()
  },
  validations: {
    form: {
      currentPassword: { required,
        minLength: minLength(6)
      },
      newPassword: { required,
        minLength: minLength(6)
      },
      repeatNewPassword: {
        sameAsNewPassword: sameAs('newPassword')
      }
    }
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser'
    }),
    init () {
      this.form = new Form(this.form)
    },
    goBack () {
      this.$router.replace({ name: 'user.settings', params: {username: this.$route.params.username} })
    },
    onSubmit () {
      let self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        self.form.submitting = false
        return false
      }
      this.form.post(window.apiUrl + '/user/' + this.authUsername + '/passwordChange').then(function (res) {
        self.form.submitting = false
      }).catch(res => {
        self.form.submitting = false
        self.form.errors = res.error
      })
    }
  }
}

</script>

<style lang="scss">
  </style>
