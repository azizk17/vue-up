<template>
      
    <div class="auth">
    <span>{{title}}</span>
    <q-icon name="close" color="grey-6" size="24px" class="fixed-top-right close-btn" @click="close()"/>
    <div class="text-negative" v-if="form.errors.errors">
          <p>{{ form.errors.errors.message }}</p>
      </div>
       <form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown="form.errors.clear($event.target.name)">
        <q-field label="الايميل" :error="$v.form.email.$error" >
              <q-input v-model.lazy="form.email" class="text-right" align="right" type="password" :disabled="form.submitting"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.email.$error" class="q-field-error col text-negative ">
                    <span class="text-negative"></span>
                   <span v-if="!$v.form.email.required">فضلا ادخل ايميلك</span>
                      
                  </div>
                </div>
            </q-field>
            <div class="text-center">
                <q-btn color="primary" @click="onSubmit()" class="no-shadow" :disabled="form.submitting"> ارسال </q-btn>
            </div>
      </form>
<q-inner-loading :visible="form.submitting">
       <q-spinner-mat size="99px" color="blue-4" />
    </q-inner-loading>
</div>
</template>

<script>
import Form from '../../utils/Form.js'
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat} from 'quasar'

export default {
  components: {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat},
  data: function () {
    return {
      title: 'استعاده كلمه المرور',
      serverErrors: {},
      errorClass: 'animated bounceIn',
      form: new Form({
        email: ''
      })
    }
  },
  validations: {
    form: {
      email: {required, email}
    }
  },
  methods: {
    ...mapActions({
    }),
    close () {
      this.$router.replace({name: 'auth.login'})
    },
    test () {
      this.$v.form.$touch()
      if (this.$v.form.username) {
      }
    },
    onSubmit (event) {
      let $self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      this.form.post(window.apiUrl + '/password/email').then(function (res) {
      }).catch(res => {
        $self.form.submitting = false
      })
    }
  }
}
</script>

<style lang="scss">

 .stacked-label label, .floating-label label{
  left: initial
 }
 .stacked-label{

 }
 .close-btn {
  padding: 20px 13px 0 0;
 }
.auth{
  padding: 13px;
    padding-top: 30%;

  .content{
      direction: rtl;
      padding: 60px 16px;
      text-align: right;

      .stacked-label input{
        width: 100%;
      }
      a{
        padding: 15px 0;
      }
  }
}

</style>
