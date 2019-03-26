<template>
<page ref="page">
<span slot="title">
  {{ title }}
</span>
<div slot="hed-left">
    <q-btn v-model="form.submitting" round color="green-4" icon="save" small loader  @click="onSubmit('ss')"
      class="no-shadow"
    />
</div>
<div slot="hed-right"></div>
<div slot="content">
    <form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown="form.errors.clear($event.target.name)" >
    <!-- ############### market status ################### -->
     <q-item tag="label" class="text-right "  :class="{'bg-lime-5' : form.available}">
      <q-item-side>
            <q-toggle v-model="form.available" color="light-green-7" />
      </q-item-side>
        <q-item-main>
          <span class="text-dark" style="padding-right: 10px" v-if="form.available">مفتوح</span>
          <span class="text-dark" style="padding-right: 10px" v-if="!form.available">مغلق</span>
        </q-item-main>
        <q-item-side>
        </q-item-side>
      </q-item>
    <!-- ###############  market location  #################### -->
     <q-list link class="text-right bg-white" color="white" v-if="form.location">
      <q-list-header>عنوان المتجر</q-list-header>
      <q-item tag="label" class="text-right" @click="$router.push({name: 'user.edit.market.location', params: {username: user.username}})" >
      <q-item-side>
        <q-icon name="location_searching" size="24px" />
      </q-item-side>
        <q-item-main>
         <span>{{ form.location.full_address }}</span>
        </q-item-main>
        <q-item-side>
          <q-icon name="check" size="24px" color="green-4" v-if="form.location.full_address"/>
        </q-item-side>
      </q-item>

      <!-- <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="checked"></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>اخفاء عنوان المتجر</q-item-tile>
        </q-item-main>
      </q-item> -->
      <div v-if="$v.form.location.$error" class="q-field-error col text-negative ">
          <span v-if="!$v.form.location.required">العنوان مطلوب</span>
          
        </div>
    </q-list>
    
    <!-- ###############  paymeny methods #################### -->
     <q-list link class="text-right bg-white" color="white">
      <q-list-header>عمليات الدفع المقبوله</q-list-header>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="form.payment_cash" val="chash" disable></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>كاش</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="notYet" val="visa" disable></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>فيزا</q-item-tile>
          <q-item-tile sublabel>سوف يتم تفعيل هذه الخاصيه قريبا</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
     <!-- ###############  dilevery methods #################### -->
     <q-list link class="text-right bg-white" color="white">
      <q-list-header>طرق التسليم</q-list-header>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="form.pickup" val="pickup" disable></q-checkbox>
        </q-item-side>
        <q-item-main>

          <q-item-tile label>استلام من المتجر</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item tag="label" class="text-right">
        <q-item-side>
          <q-checkbox v-model="notYet"  val="dilevery" disable></q-checkbox>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>توصيل</q-item-tile>
          <q-item-tile sublabel>سوف يتم تفعيل هذه الخاصيه قريبا</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
   
   </form>
  </div>
</page>
</template>

<script>
import Form from '../../../../utils/Form.js'
import { mapGetters, mapActions } from 'vuex'
// import authService from '../../services/authService'
import { required } from 'vuelidate/lib/validators'
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QField, QInput, QItem, QItemSide, QItemMain, QItemTile, QCheckbox, QList, QListHeader, QDatetime, QOptionGroup, QRadio, QToggle} from 'quasar'

export default {
  components: {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, QField, QInput, QItem, QItemSide, QItemMain, QItemTile, QCheckbox, QList, QListHeader, QDatetime, QOptionGroup, QRadio, QToggle},
  data () {
    return {
      title: 'اعدادات المتجر',
      errorClass: 'animated bounceIn',
      checked: false,
      changed: false,
      notYet: false,
      group: '',
      tev: {},
      tempLocation: null,
      form: new Form({
        location: this.getMarketLocation,
        payment_cash: true,
        pickup: true,
        available: true
      })
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user',
      getMarketLocation: 'market/getLocation',
      getTempMarketLocation: 'market/getTempMarketLocation'
    })
  },
  mounted: function () {
    // setTimeout(function () {
    //   if (this.getMarketLocation.full_address) {
    //     // this.form.location = this.getMarketLocation.full_address
    //     this.$bus.$emit('page:unSaved', true)
    //   }
    // }.bind(this), 10)
    this.form.location = this.getMarketLocation
  },
  destroyed () {
    // this.clearLocation()
    // console.log(this.getMarketLocation)
  },
  validations: {
    form: {
      location: {required},
      payment_cash: {required},
      pickup: {required}
    }
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      clearLocation: 'market/clearLocation'
    }),
    test () {
      if (this.form.location !== this.getMarketLocation.full_address) {
        console.log('hell')
      }
    },
    detectChange (event) {
      this.changed = true
    },
    open () {
    },
    saved () {
      this.$bus.$emit('page:unSaved', false)
      this.$router.back()
    },
    goBack () {
      this.$router.replace({ name: 'user.settings', params: {username: this.$route.params.username} })
    },
    onSubmit () {
      let self = this
      console.log(this.form.location)
      this.$v.form.$touch()
      console.log(this.$v.form)
      if (this.$v.form.$error) {
        return false
      }
      console.log('hey')
      this.form.post(window.apiUrl + '/user/' + this.authUsername + '/market/save').then(function (res) {
        self.form.submitting = false
        console.log(res)
      }).catch(res => {
        self.form.submitting = false
        self.form.errors = res.error
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.q-list-header {
    padding-right: 16px;
}
  </style>
