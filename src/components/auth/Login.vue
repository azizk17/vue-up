<template>
      
    <div class="auth">
    <div class="text-center">
          <img src="~assets/login.png" style="opacity: .5">
    </div>
    <q-icon name="close" color="grey-6" size="24px" class="fixed-top-right close-btn" @click="close()"/>
    <span>{{ title }}</span>
    <div class="text-negative" v-if="serverErrors">
          <p>{{ serverErrors }}</p>
      </div>
       <form class="form-horizontal" method="POST"  @submit.prevent="login($event)" @keydown="form.errors.clear($event.target.name)">
      <q-field label="اسم المستخدم" :error="$v.form.username.$error" >
              <q-input v-model.lazy="form.username" class="text-right" align="right" :disabled="form.submitting"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.username.$error" class="q-field-error col text-negative ">
                      <span class="text-negative"></span>
                   <span v-if="!$v.form.username.required">فضلا ادخل اسم المستخدم</span>
                  </div>
                </div>
            </q-field>
            <q-field label="كلمه المرور" :error="$v.form.password.$error" >
              <q-input v-model.lazy="form.password" class="text-right" align="right" type="password" :disabled="form.submitting"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.password.$error" class="q-field-error col text-negative ">
                    <span class="text-negative"></span>
                   <span v-if="!$v.form.password.required">فضلا ادخل اسم المستخدم</span>
                      
                  </div>
                </div>
            </q-field>
            <div class="text-center">
                <q-btn color="primary" type="submit"  class="no-shadow" :disabled="form.submitting"> ارسال </q-btn>
            </div>
            <div class="text-right" style="padding-top: 30px">
              <router-link :to="{name: 'auth.password'}" replace>نسيت كلمه المرور!</router-link>
              <router-link :to="{name: 'auth.signup'}" class="block" replace>ليس لديك حساب! انضم الينا</router-link>
            </div>
   </form>

<q-inner-loading :visible="loading">
       <q-spinner-mat size="99px" color="blue-4" />
    </q-inner-loading>
</div>
</template>

<script>
import Form from '../../utils/Form.js'
import { mapActions } from 'vuex'
import authService from '../../services/authService'
import { required, minLength, email } from 'vuelidate/lib/validators'
import {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat} from 'quasar'

export default {
  components: {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat},
  data: function () {
    return {
      title: '',
      canGoBack: window.history.length > 1,
      serverErrors: '',
      loading: false,
      errorClass: 'animated bounceIn',
      form: new Form({
        username: '',
        password: '',
        grant_type: 'password',
        client_id: 3,
        client_secret: 'td8qXG1tyN4PZVvcgAbYO9WS06Zaszi5tcS1KcyG',
        scope: '*'
      })
    }
  },
  validations: {
    form: {
      username: {required, minLength: minLength(6), email},
      password: {required}
    }
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
      authUser: 'authUser',
      setUser: 'setUser'
    }),
    close () {
      this.$router.back()
    },
    login (e) {
      e.preventDefault()
      const self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      this.loading = true
      let data = {
        username: this.form.username,
        password: this.form.password
      }
      authService.login(data).then(function (res) {
        console.log(res)
        self.close()
        self.loading = false
      }).catch(error => {
        self.loading = false
        if (error.status === 401) {
          self.serverErrors = 'بيانات الدخول غير صحيحه'
        }
        else {
          self.serverErrors = 'حد خطا، حاول مره اخرى لاحقا'
        }
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
  padding-top: 10%;
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
