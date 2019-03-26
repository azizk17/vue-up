<template>
<page>
<span slot="title">
  {{ title }}
</span>
<div slot="hed-left">
    <q-btn :disable="form.submitting" round color="light-blue-3" icon="save" small   @click="onSubmit()" class="no-shadow no-padding"/>
</div>
<div slot="content">
      <form class="form-horizontal" method="POST"   @keydown="form.errors.clear($event.target.name)">
   
    <q-field label="الاسم" :error="$v.form.name.$error" >
      <q-input v-model.lazy="form.name" align="right" :disable="form.submitting"/>
        <div class="q-field-bottom row no-wrap">
          <div class="q-field-error col text-negative ">
            <span v-if="!$v.form.name.maxLength">٢٤ حرف كحد اقصى</span>
          </div>
        </div>
    </q-field>

     <q-field label="عنك" :error="$v.form.bio.$error" >
      <q-input v-model.lazy="form.bio" class="text-right" align="right" :disable="form.submitting"/>
        <div class="q-field-bottom row no-wrap">
          <div class="q-field-error col text-negative ">
            <span v-if="!$v.form.bio.maxLength">١٤٠ حرف كحدى اقصى</span>
          </div>
        </div>
    </q-field>

     <q-field label="الجوال" :error="$v.form.phone.$error" >
      <q-input v-model.lazy="form.phone" class="text-right" align="right" :disable="form.submitting" placeholder="966000000000"/>
        <div class="q-field-bottom row no-wrap">
          <div class="q-field-error col text-negative ">
            <span v-if="!$v.form.phone.phoneRegex">صيفه رقم الجوال غير صحيحه</span>
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
import { maxLength } from 'vuelidate/lib/validators'
import { QTransition, QIcon, QBtn, QField, QInput, QInnerLoading, QSpinnerGears } from 'quasar'

const phoneRegex = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  }
  return /^[0-9]*$/.test(value)
}
export default {
  components: { QTransition, QIcon, QBtn, QField, QInput, QInnerLoading, QSpinnerGears },
  data () {
    return {
      title: 'الصفحه الشخصيه',
      disable: false,
      transition: {
        enter: 'fadeInUpBig',
        leave: 'fadeOut'
      },
      avatar: new Form({
        avatar: ''
      }),
      form: {
        name: '',
        bio: '',
        phone: ''
      },
      mailHasError: false

    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user'
    })
  },
  mounted: function () {
    // change toolbar title
    console.log(this.title)
    this.$bus.$emit('account-title', this.title)
    this.init()
  },
  validations: {
    form: {
      name: { maxLength: maxLength(24) },
      bio: { maxLength: maxLength(140) },
      // dob: { date: date },
      phone: { phoneRegex: phoneRegex }
    },
    avatar: {}
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser'
    }),
    test () {
      this.$bus.$emit('account-title', this.title)
    },
    changeAvatar () {
      console.log('ffff')
      this.$refs.avatar.click()
    },
    init () {
      this.form = new Form({
        name: this.user.name,
        bio: this.user.bio,
        phone: this.user.phone
      })
    },
    goBack () {
      this.$router.replace({ name: 'user.settings', params: {username: this.$route.params.username} })
    },
    onSubmit (event, done) {
      let self = this
      console.log(this.form)
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      this.form.post(window.apiUrl + '/user/' + this.authUsername + '/update').then(function (res) {
        console.log('resp mmmmm')
        self.setUser(res.data)
        self.form.submitting = false
      }).catch(error => {
        if (error) {
          console.log('error update ')
          self.form.submitting = false
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
input[type='text'], input[type='email'], input[type='search'], input[type='password'] {
  text-align: right;
}
.q-if-label{
  // right: inherit;
  // left: inherit;
  }
  </style>
}
