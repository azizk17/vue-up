<template>
<q-modal ref="page"  position="left"  :content-css="{minWidth: '100%', minHeight: '100%', direction: 'rtl'}">
  <q-modal-layout  :header-style="{'box-shadow': 'none'}">
      <q-toolbar class="text-center no-shadow"  slot="header" >
       <q-btn  icon="add_a_photo"  flat small round color="white" class="bg-amber-6 uploadBtn" @click="uploadMeida">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">

        </q-btn>
        <!-- <button class="bg-faded text-light uploadBtn text-right" @click="uploadMeida">
          <q-icon name="add_a_photo" v-if="!isSaving"></q-icon>
          <spinner v-if="isSaving" color="#fff" :size="30"></spinner>
        </button> -->
        <div v-if="$v.form.media.$error" class="text-negative error-item-msg" style="position: absolute;right: 10px;top: 45px; z-index:40">
              <span v-if="!$v.form.media.required">اضف صوره</span>
        </div>  

        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn color="faded" flat round small class="bg-blue-3" icon="close" @click="goBack()"></q-btn>
      </q-toolbar>  

    <div class="layout-padding">
    <!-- ####### content ###### --> 
    {{ form.media }}
    <uploader :url="uploadingUrl" class=" no-shadow no-border transparent" multiple />

    <div class="box">
      <div class="content" style="background: #fff">
          <!-- <button class="bg-primary text-light" @click="getImage()"> chose </button> -->
           
        <form class="form-horizontal" method="POST"  @submit.prevent="onSubmit($event)" @keydown="form.errors.clear($event.target.name)">
        
        <q-field :error="$v.form.description.$error" >
              <q-input v-model.lazy="form.description" class="text-right" placeholder="وصف المنتج"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.description.$error" class="q-field-error col text-negative ">
                   <span v-if="!$v.form.description.required">فضلا ادخل اسم المستخدم</span>                       
                  </div>
                </div>
            </q-field>
             <q-field :error="$v.form.price.$error" >
              <q-input v-model.lazy="form.price" class="text-right" placeholder="السعر"/>
                <div class="q-field-bottom row no-wrap">
                  <div v-if="$v.form.price.$error" class="q-field-error col text-negative ">
                    <span v-if="!$v.form.price.required">كم السعر !!</span>
                       <span v-if="!$v.form.price.numeric">ارقام فقط</span>                  
                  </div>
                </div>
            </q-field>
        </form>
         <li class="list-item row no-border">
             <div v-for="img in form.media" class="prevImg-contanier" v-if="media.length > 0">
             <div class="width-1of3">
        
              <q-icon name="clear" class="bg-light round-borders imgRemBtn shadow-4" @click="removePrevImg(img)"
              size="20px" color="faded"/>
            <img :src="imgSrc + img" id="prevImg" class="responsive">
            </div>
            </div>
          </li>
      </div>
    </div>
    </div>
    <q-toolbar slot="footer">
    <q-btn class="full-width bg-faded" @click="onSubmit">
      send 
    </q-btn>
       
    </q-toolbar>
      </q-modal-layout>
      </q-modal>
<!-- 
    1- desc
    2- heighties quntity 
    3- price 
    4- expected time to get be ready 
    <p>efrfr erfgerg erg erg reg erg er ger</p> -->
</template>

<script>
import Form from '../../utils/Form.js'
import {mapGetters} from 'vuex'
import { required, numeric } from 'vuelidate/lib/validators'
import {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, Toast, QInput, QField, QSpinnerOval, QChip, QTooltip} from 'quasar'
import Uploader from '../particles/Uploader'
export default {
  components: {QModal, QModalLayout, QToolbar, QToolbarTitle, QIcon, QBtn, Toast, QInput, QField, QSpinnerOval, QChip, QTooltip, Uploader},
  data () {
    return {
      step1: true,
      step2: false,
      active: false,
      title: 'اضافه منتج',
      form: new Form({
        description: '',
        price: null,
        media: []
      }),
      uploadingUrl: window.apiUrl + '/posts/upload/media/',
      mediaObj: null,
      imgSrc: window.apiUrl + '/posts/media/',
      uploadFieldName: 'media[]',
      uploadedFiles: [],
      isSaving: false,
      prevImg: false,
      formInfo: {name: 'dfrr', why: 'rfri'},
      path: window.apiUrl + '/posts/create/media',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      },
      media: ['sss']
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted: function () {
  },
  validations: {
    form: {
      description: {required},
      price: {required, numeric},
      media: {required}
    }
  },
  methods: {
    test: function () {
      this.$refs.upload.processQueue()
    },
    open () {
      this.$refs.page.open()
    },
    goBack () {
      this.$refs.page.close()
    },
    imgChange: function (e) {
      console.log(e)
      // this.form.media.push(e.target.result)
    },
    'showSuccess': function (file, res) {
      // file.media_name = res
      // console.log('res', file)
      // this.media.push(file.media_name)
    },
    removedFile: function (file) {
      // console.log(file.media_name)
      // let index = this.media.indexOf(file.media_name)
      // this.media.splice(index, 1)
    },
    nextStep: function () {
      this.step1 = false
      this.step2 = true
    },
    previousStep: function () {
      this.step1 = true
      this.step2 = false
    },
    getImage: function () {
      // browse images in device PHOTOLIBRARY
      // navigator.camera.getPicture(onSuccess, onFail, {
      //   quality: 100,
      //   destinationType: navigator.camera.DestinationType.FILE_URI,
      //   sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      // })
      // let self = this
      // function onSuccess (imageData) {
      //   // self.form.file = imageData
      //   self.media.push(imageData)
      //   self.prevImg = true
      // }
      // function onFail (message) {
      //   console.log('Failed')
      // }
    },
    displayImg: function () {
      // body...
    },
    removePrevImg: function (file) {
      this.prevImg = false
      // this.form.file = ''
      let index = this.uploadedFiles.indexOf(file)
      this.uploadedFiles.splice(index, 1)
    },
    uploadMeida: function () {
      let self = this
      window.axios.post(window.apiUrl + '/posts/upload/media', {headers: self.headers, media: self.media}).then(function (res) {
        console.log('res', res)
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    upload: function (formData) {
      // let BASE_URL = 'frrfr'
      // const url = `${BASE_URL}/photos/upload`
      return window.axios.post(window.apiUrl + '/posts/upload/media', formData)
        // get data
        .then(x => x.data)
    },
    save (formData) {
        // upload data to the server
      this.upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          // this.currentStatus = STATUS_SUCCESS
          this.form.media = this.uploadedFiles
          this.isSaving = false
        })
        .catch(err => {
          this.uploadError = err.response
          // this.currentStatus = STATUS_FAILED
          this.isSaving = false
        })
    },
    filesChange (fieldName, fileList) {
      this.isSaving = true
        // handle file changes
      const formData = new FormData()
      if (!fileList.length) return
       // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })
        // save it
      this.save(formData)
    },
    onSubmit (event, done) {
      // 1- upload media
      // 2- create post and attache media file name
      let $self = this
      // this.save(this.mediaObj)
      this.form.media = this.uploadedFiles
      $self.form.submitting = true
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        $self.form.submitting = false
        done()
        return false
      }
      console.log(this.form)
      // this.media.append('description', this.form.description)
      // this.media.append('price', this.form.price)
      // window.axios.post(window.apiUrl + '/posts/create', this.form).then(function (res) {
      //   // body...
      // })
      this.form.post(window.apiUrl + '/posts/create').then(function (res) {
        Toast.create.positive('تم اضافه المنتج')
        $self.reset()
      }).catch(res => {
        console.log(res)
        $self.form.submitting = false
        done()
      })
    },
    reset: function () {
      this.$refs.page.close()
      this.form.reset()
      this.$v.form.$reset()
    }
  }
}
</script>

<style type="scss">
.prevImg-contanier{
  position: relative;
}
.desc-input {
  height: 120px;
  &:active {
    background: #fff;
  }
}
.price-input{

}
#prevImg{
  /*max-width: 190px;
  max-height: 110px;*/
/*  width: 190px;
  height: 110px;
  background: gray;*/
  min-height: 55px;
  min-width: 55px;
  max-height: 90px;
  max-width: 120px;
  padding: 6px;
}
.imgRemBtn{
  position: absolute;
  top: 0px;
  right: 0px;
  
}
.upload {
    position: relative;
    height: 55px;
}
.uploadBtn, .input-file{
   width: 50px;
   height: 30px;
}
.uploadBtn{
     position: absolute;
    text-align: center;
}
.input-file{
  opacity: 0;
  position: relative;
  z-index: 1;
}
.slide-up-enter-active {
  transition: all .3s ease;
}
.slide-up-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-up-enter, .slide-up-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.iuploader{
  background: green;
  
}
.q-input-target {

    background: gray;
  }
</style>
