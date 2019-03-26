<template>
  <page>
 <span slot="title">
  {{ title }}
</span>
<div slot="hed-left">
    <q-btn :disable="loading" round color="light-blue-3" icon="save" small   @click="onSubmit()" class="no-shadow no-padding"/>
</div>
    <div slot="content">

      <div>
         <form class="form-horizontal" method="POST">
          <q-field  :error="$v.form.description.$error" >
            <q-input v-model.lazy="form.description" placeholder="الوصف" align="right"/>
              <div class="q-field-bottom row no-wrap">
                <div class="q-field-error col text-negative" v-if="$v.form.description.$error">
                  <span v-if="!$v.form.description.maxLength">١٤ حرف كحد اقصى</span>
                </div>
              </div>
          </q-field>
          <q-field :error="$v.form.price.$error" >
              <q-input v-model.lazy="form.price" class="text-right" suffix="ريال" placeholder="السعر" align="right"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.price.$error" class="q-field-error col text-negative ">
                    <span v-if="!$v.form.price.required">كم السعر !!</span>
                       <span v-if="!$v.form.price.numeric">ارقام فقط - بلانجليزي</span>                  
                  </div>
                </div>
            </q-field>
        </form>
      </div>
      <!-- ############### upload media ###################### -->
      <div class="fixed-bottom" style="padding: 5px 13px; border-top: 1px solid rgba(0,0,0,0.12)">
        <div v-for="(file , index ) in form.files">
          <div class="img-container ">
            <span class=" img-order bg-primary text-dark"> {{ index + 1 }} </span>
            <q-icon name="delete_forever" color="grey-7" size="35px" id="icon1" class="animate-pop img-remove" @click="reomveFile(file)"/>
            <img :src="file.__img.src" >
          </div>
        </div>
        <q-icon class="pull-left" name="add_a_photo" color="grey-7" size="44px" style="padding: 2.5% 0 " @click="pickFile()"/>
        <input ref="file" type="file" name="file" multiple v-on:change="addFile($event)" hidden>
      </div>
      <!-- #################### loader #################### -->
      <q-inner-loading :visible="loading">
        <q-spinner-mat size="50px" color="blue-4" />
      </q-inner-loading>
    </div>
  </page>
</template>

<script>
import {QIcon, QBtn, Toast, QInput, QField, QSpinnerOval, QChip, QTooltip, QInnerLoading, QSpinnerMat} from 'quasar'
import {mapGetters} from 'vuex'
import {required, numeric, maxLength} from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  components: {QIcon, QBtn, Toast, QInput, QField, QSpinnerOval, QChip, QTooltip, QInnerLoading, QSpinnerMat},
  data () {
    return {
      title: '',
      loading: false,
      files: [], // file object to preview thumb
      queue: [], // file objects send to server
      form: {
        files: [],
        description: '',
        price: null
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  validations: {
    form: {
      files: {required},
      description: {required, maxLength: maxLength(14)},
      price: {required, numeric}
    }
  },
  methods: {
    pickFile () {
      this.$refs.file.click()
    },
    addFile (e) {
      if (e.target.files.length > 3 || this.form.files.length > 2) {
        alert('max 3 photos only')
        return
      }
      let self = this
      let files = Array.prototype.slice.call(e.target.files)
      files = files.filter(file => !this.form.files.some(f => file.name === f.name))
        .map(file => {
          const reader = new FileReader()
          reader.onload = (e) => {
            let img = new Image()
            img.src = e.target.result
            file.__img = img
            this.form.files.push(file)
          }
          reader.readAsDataURL(file)
          return file
        })
      // this.files = this.files.concat(files)
      console.log(self.form.files)
      console.log(files)
      // clear file input
      this.$refs.file.value = null
    },
    reomveFile (file) {
      this.form.files = this.form.files.filter(obj => obj.name !== file.name)
      console.log(file)
    },
    onSubmit () {
      let self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      this.loading = true
      let form = new FormData()
      for (var i = 0; i < this.form.files.length; i++) {
        form.append('Content-Type', this.form.files[i].type)
        form.append('files[]', this.form.files[i])
      }
      form.append('price', this.form.price)
      form.append('description', this.form.description)
      let path = window.apiUrl + '/posts/create'
      axios.post(path, form).then(function (res) {
        self.saved()
      }).catch(res => {
        self.unSaved()
      })
    },
    saved () {
      this.form = {}
      this.$router.back()
      this.loading = false
    },
    unSaved () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scopped>
.img-container {
    float: right;
    position: relative;
    padding: 5px;
    & img {
      width: 70px;
      height: 70px;
      border-radius: 7px;
    }
}
.img-order {
    position: absolute;
    margin: 0 auto;
    background: red;
    height: 17px;
    width: 17px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    text-align: center;
}

.img-remove {
    position: absolute;
    bottom: 0; left: 0; top: 0; right:0;
    margin: 0 auto;
    text-align: center;
}
</style>
