<template>
    <div class="auth">
        <q-icon name="close" color="grey-6" size="24px" class="fixed-top-right close-btn" @click="close()"/>
        
    <div class="content text-center">
    <div class="text-center">
          <img src="~assets/house-key.png" style="opacity: .3">
        </div>
      <div class="text-negative" v-if="form.errors.errors > 0">
          <p :class="errorClass" > {{ form.errors.errors }}</p>
      </div>
      <form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown.native="form.errors.clear($event.target.name)">
      <q-field label="اسم المستخدم" :error="$v.form.username.$error" >
              <q-input v-model.lazy="form.username" class="text-right" align="right" :disabled="form.submitting"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.username.$error" class="q-field-error col text-negative ">
                    <span  v-if="!$v.form.username.required">فضلا ادخل اسم المستخدم</span>
                    <span  v-if="!$v.form.username.minLength">ثلاثه خانات على الاقل</span>
                    <span  v-if="!$v.form.username.maxLength">اربعه عشر خانه كحد اقصى</span>
                  <span  v-if="!$v.form.username.usernameRege">يجب ان يكون مكون من ( حروف ، ارقام ، ـ ، -) انجليزي</span>
                    <span  v-if="!$v.form.username.isUnique">اسم المستخدم مستخدم من قبل </span>
                  </div>
                </div>
      </q-field>
      <q-field label="الايميل" :error="$v.form.email.$error" >
              <q-input v-model.lazy="form.email" class="text-right" align="right" :disabled="form.submitting"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.email.$error" class="q-field-error col text-negative ">
                   <span v-if="!$v.form.email.required">فضلا ادخل ايميلك</span>
                    <span  v-if="!$v.form.email.email">صيغه الايميل غير صحيحه</span>
                     <span  v-if="!$v.form.email.isUnique">هذا الايميل مستخدم مسبقا</span>
                  </div>
                </div>
      </q-field>
       <q-field label="كلمه المرور" :error="$v.form.password.$error" >
              <q-input v-model.lazy="form.password" type="password" class="text-right" align="right" :disabled="form.submitting"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.password.$error" class="q-field-error col text-negative ">
                   <span v-if="!$v.form.password.required">فضلا ادخل كلمه المرور</span>
                  </div>
                </div>
      </q-field>

    </form>
    <div class="text-center">
                <q-btn color="primary" @click="onSubmit()" class="no-shadow" :disabled="form.submitting"> ارسال </q-btn>
            </div>
            <div class="text-right" style="padding-top: 30px">
              <router-link :to="{name: 'auth.login'}" replace>لديك حساب من قبل !</router-link>
            </div>

 </div>
</div>
</template>

<script>
import Form from '../../utils/Form.js'
import { mapActions } from 'vuex'
import authService from '../../services/authService'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat} from 'quasar'

const usernameRege = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-z0-9_-]{3,15}$/.test(value)
}
export default {
  components: {QField, QInput, QBtn, QIcon, QInnerLoading, QSpinnerMat},
  data: function () {
    return {
      canGoBack: window.history.length > 1,
      serverErrors: {},
      errorClass: 'animated bounceIn',
      loading: true,
      form: new Form({
        username: '',
        email: '',
        password: ''
      })
    }
  },
  validations: {
    form: {
      username: { required,
        minLength: minLength(3),
        maxLength: maxLength(14),
        usernameRege: usernameRege,
        async isUnique (value) {
          if (value === '') return true
          const response = await fetch(window.apiUrl + `/user/check/username/${value}`)
          return Boolean(await response.json())
        }
      },
      email: { required,
        email,
        async isUnique (value) {
          if (value === '') return true
          const response = await fetch(window.apiUrl + `/user/check/email/${value}`)
          return Boolean(await response.json())
        }
      },
      password: { required, minLength: minLength(6) }
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
    onSubmit (event) {
      let $self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      let loginData = {
        username: this.form.email,
        password: this.form.password
      }
      this.form.post(window.apiUrl + '/register').then(function (res) {
        console.log('res', res)
        $self.login(loginData).then(function (res) {
          console.log(this)
        })
      }).catch(error => {
        if (error) {
          $self.form.errors.errors.message = 'حدث خطا، نرجوا المحاوله في وقت لاحق'
        }
      })
    },
    login (data) {
      let $self = this
      axios.post(window.apiUrl + '/oauth/token', authService.grantPassword(data)).then(function (res) {
        let token = res.data.access_token
        if (token !== undefined || token !== null) {
          authService.getUserProfile(token).then(function (res) {
            if (res.error) {
              $self.form.errors.errors.message = 'حدث خطا، نرجوا المحاوله في وقت لاحق'
              return false
            }
            // save token and user info then go back 'using promise to avoid route asynchronous check for token'
            let saveToken = new Promise(function (resolve, reject) {
              // set user token for later use
              let setUser = authService.setUser(res)
              let setToken = authService.setToken(token)
              if (!setUser || !setToken) {
                reject(new Error('error'))
              }
              else {
                resolve('done')
              }
            })
            // go back or close modal
            saveToken.then(function (res) {
              $self.close()
            }).catch(error => {
              // handel getting token errors - server response
              if (error) {
                console.log(error)
              }
              $self.form.errors.errors.message = 'حدث خطا، نرجوا المحاوله في وقت لاحق'
              return false
            })
          })
        }
      }).catch(res => {
        // handel getting token errors - server response
        // if username || password incorrect
        if (res.error === 'invalid_credentials') {
          this.form.errors.errors.message = 'بيانات الدخول غير صحيحه'
        }
      })
    }
  }
}
</script>

<style lang="scss">

.close-btn {
  padding: 20px 13px 0 0;
 }
 .stacked-label label, .floating-label label{
  left: initial
 }
 .stacked-label{

 }
.auth{
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

  .error-item-msg{
    .item{
      height: 20px;
      padding: 0 0 2px 0;
    }
  }

}

</style>
