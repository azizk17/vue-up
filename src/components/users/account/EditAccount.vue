<template>
<page>
  <span slot="title">
    {{ title }}
  </span>
  <div slot="hed-left">
    <q-btn :disable="form.submitting" round color="light-blue-3" icon="save" small   @click.prevent="onSubmit()" class="no-shadow no-padding"/>
  </div>
<div slot="content">
        <form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown="form.errors.clear($event.target.name)">
            <q-field label="اسم المستخدم" :error="$v.form.username.$error" >
              <q-input v-model.lazy="form.username" class="text-right" align="right"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.username.$error" class="q-field-error col text-negative ">
                      <span class="text-negative"></span>
                   <span v-if="!$v.form.username.required">فضلا ادخل اسم المستخدم</span>
                           <span class="block" v-if="!$v.form.username.minLength">ثلاثه خانات على الاقل</span>
                           <span class="block" v-if="!$v.form.username.maxLength">اربعه عشر خانه كحد اقصى</span>
                           <span class="block" v-if="!$v.form.username.usernameRege">يجب ان يكون مكون من ( حروف ، ارقام ، ـ ، -) انجليزي</span>
                           <span class="block" v-if="!$v.form.username.isUnique">اسم المستخدم محجوز </span>
                  </div>
                </div>
            </q-field>
            <q-field label="الاسم" :error="$v.form.email.$error" >
            <q-input v-model.lazy="form.email" class="text-right" align="right"/>
              <div class="q-field-bottom row no-wrap">
                <div v-if="$v.form.email.$error"  class="q-field-error col text-negative ">
                   <span v-if="!$v.form.email.required">فضلا ادخل ايميلك</span>
                           <span v-if="!$v.form.email.email">صيغه الايميل غير صحيحه</span>
                           <span v-if="!$v.form.email.isUnique">هذا الايميل مستخدم مسبقا</span>
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
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import {QTransition, QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QField, QInput, QInnerLoading, QSpinnerGears} from 'quasar'

const usernameRegex = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[a-z0-9_-]{3,15}$/.test(value)
}

export default {
  components: {QTransition, QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QField, QInput, QInnerLoading, QSpinnerGears},
  data () {
    return {
      title: 'تعديل بيانات الحساب',
      form: {
        username: '',
        email: ''
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
      username: { required,
        minLength: minLength(3),
        maxLength: maxLength(14),
        usernameRegex: usernameRegex,
        async isUnique (value) {
          if (value === '' || value === this.user.username) return true
          const response = await fetch(window.apiUrl + `/user/check/username/${value}`)
          return Boolean(await response.json())
        }
      },
      email: { required,
        email,
        async isUnique (value) {
          if (value === '' || value === this.user.email) return true
          const response = await fetch(window.apiUrl + `/user/check/email/${value}`)
          return Boolean(await response.json())
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser'
    }),
    init () {
      this.form = new Form(this.user)
    },
    goBack () {
      this.$router.replace({ name: 'user.settings', params: {username: this.$route.params.username} })
    },
    onSubmit () {
      let self = this
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        console.log(this.$v.form.$error)
        self.update()
      }
    },
    update () {
      let self = this
      this.form.post(window.apiUrl + '/user/' + this.authUsername + '/update').then(function (res) {
        self.setUser(res.data)
        self.form.submitting = false
      }).catch(res => {
        self.form.submitting = false
      })
    }
  }
}

</script>

<style lang="scss">
  </style>
