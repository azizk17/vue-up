<template>
  <div>
 <!--  	<div class="edit-avatar">
      <avatar :src="user.avatar" icon="edit"/>
      <span class="block clickable">تغيير الصوره</span>
      <input type="file" name="file" @change="setUpFileUploader">
  	</div> -->
  	<avatar :src="user.avatar"></avatar>
  	<q-btn flat color="primary" @click="choseFile()" :disable="loading" class="block no-padding no-shadow"> 
  	<q-inner-loading :visible="loading">
      <q-spinner-ios size="50px" color="primary"></q-spinner-ios>
    </q-inner-loading>
  	تغيير الصوره
  	</q-btn>
  	<input ref="fileInput" type="file" name="file" @change="setUpFileUploader" hidden="true">
  	<q-modal ref="cropModal" class="bg-primary" >
  		<vue-croppie
		    ref="croppieRef"
		    :enableOrientation="true"
		    :mouseWheelZoom="true"
		    :showZoomer="false"
		    :enforceBoundary="false"
		    :enableResize="false"
		    size="original"
		    :viewport="{ width: 250, height: 250, type: 'circle' }"
		    :boundary="{width: 400, height: 400}"
			>
		</vue-croppie>
	<div class="fixed-bottom">
		<q-btn color="primary" @click="crop()" class="no-shadow">حفظ</q-btn>
		<q-btn flat color="primary" class="pull-right" @click="close()">اغلاق</q-btn>
	</div>
</q-modal>
  	


  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import {QModal, QModalLayout, QIcon, QBtn, QInnerLoading, QSpinnerIos} from 'quasar'
export default {
  components: {QModal, QModalLayout, QIcon, QBtn, QInnerLoading, QSpinnerIos},
  data () {
    return {
      image: null,
      cropped: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      authUsername: 'auth/username',
      user: 'auth/user'
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      setAvatar: 'auth/setAvatar'
    }),
    choseFile () {
      this.$refs.fileInput.click()
    },
    setUpCroppie () {
      let self = this
      this.$refs.croppieRef.bind({
        url: self.image
      })
    },
    setUpFileUploader (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.$refs.cropModal.open()
      this.createImage(files[0])
    },
    createImage (file) {
      // var image = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
        vm.setUpCroppie()
      }
      reader.readAsDataURL(file)
    },
    crop () {
      let options = {
        format: 'jpeg',
        circle: false
      }
      let self = this
      this.$refs.croppieRef.result(options, (output) => {
        // var image = new Image()
        // image.src = output
        self.cropped = output
        // console.log('dddd', output)
        self.save()
      })
    },
    save (done) {
      let self = this
      let path = window.apiUrl + '/user/' + this.authUsername + '/update-avatar'
      let data = { avatar: this.cropped }
      this.loading = true
      this.close()
      axios.post(path, data).then(function (res) {
        self.loading = false
        self.setAvatar(res.data)
        console.log(self.user)
      }).catch(error => {
        if (error) {
          this.loading = false
        }
      })
    },
    close () {
      this.$refs.fileInput.value = null
      this.$refs.cropModal.close()
    }
  }
}
</script>

<style>
</style>
