<template>
  <div class="q-uploader">
  <div class="text-center">
  	  <q-icon
        v-if="!uploading"
        slot="after"
        name="add_a_photo"
        size="60px"
        class="q-uploader-pick-button q-if-control relative-position overflow-hidden "
        @click="__pick"
        :disabled="addDisabled"
      >
        <input
          type="file"
          ref="file"
          class="q-uploader-input absolute-full cursor-pointer"
          :accept="extensions"
          :multiple="multiple"
          @change="__add"
        >
      </q-icon>
  </div>

    <q-input-frame>
      <q-icon
        v-if="!hideUploadButton && !uploading"
        slot="after"
        name="cloud_upload"
        class="q-if-control"
        :disabled="length === 0"
        @click="upload"
        v-show="false"
      ></q-icon>
    </q-input-frame>

    <div class="q-uploader-files scroll  ">
    <div class="row">
    <q-card  v-for="file in files" :key="file.name" class="col justify-start no-border" flat >
    	<q-icon color="light" name="close" size="2em" @click="__remove(file)" class="cursor-pointer bg-grey-6 relative-position" style="border-radius: 160px; top: 19px; z-index: 3 " />
    	<q-card-media style=" border-radius: 13px" class="bg-light">
    	<div class="upload-done">
    	<q-icon name="cloud_done" size="500%" color="green" class="uploaded-icon" v-if="file.__doneUploading"></q-icon>
    	<q-icon name="error" size="500%" color="negative" class="uploaded-icon" v-if="file.__failed"></q-icon>
    	</div>
    	<img v-if="file.__img" :src="file.__img.src" class="responsive">
<!--     	<q-icon v-else name="insert_drive_file" />
 --><!--     		<q-progress :percentage="file.__progress" stripe  style="height: 14px" v-if="!hideUploadProgress"/>
 -->
    	</q-card-media>
    </q-card>
    </div>
      
    </div>
  </div>
</template>

<script>

import { format, QInputFrame, QSpinner, QIcon, QProgress, QItem, QItemSide, QItemMain, QItemTile, QCard, QCardMedia } from 'quasar'

const {humanStorageSize} = format
function initFile (file) {
  file.__doneUploading = false
  file.__failed = false
  file.__uploaded = 0
  file.__progress = 0
}

export default {
  name: 'uploader',
  components: {
    QInputFrame,
    QSpinner,
    QIcon,
    QProgress,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QCard,
    QCardMedia
  },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    headers: Object,
    url: {
      type: String,
      required: true
    },
    urlFactory: {
      type: Function,
      required: false
    },
    additionalFields: {
      type: Array,
      default: () => []
    },
    method: {
      type: String,
      default: 'POST'
    },
    extensions: String,
    multiple: Boolean,
    hideUploadButton: Boolean,
    hideUploadProgress: Boolean,
    noThumbnails: Boolean,

    color: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      queue: [],
      files: [],
      uploading: false,
      uploadedSize: 0,
      totalSize: 0,
      xhrs: [],
      focused: false
    }
  },
  computed: {
    length () {
      return this.queue.length
    },
    label () {
      const total = humanStorageSize(this.totalSize)
      return this.uploading
        ? `${(this.progress).toFixed(2)}% (${humanStorageSize(this.uploadedSize)} / ${total})`
        : `${this.length} (${total})`
    },
    progress () {
      return this.totalSize ? Math.min(99.99, this.uploadedSize / this.totalSize * 100) : 0
    },
    addDisabled () {
      return !this.multiple && this.length >= 1
    }
  },
  methods: {
    __add (e) {
      if (this.addDisabled) {
        return
      }

      let files = Array.prototype.slice.call(e.target.files)
      this.$refs.file.value = ''

      files = files.filter(file => !this.queue.some(f => file.name === f.name))
        .map(file => {
          initFile(file)
          file.__size = humanStorageSize(file.size)

          if (this.noThumbnails || !file.type.startsWith('image')) {
            this.queue.push(file)
          }
          else {
            const reader = new FileReader()
            reader.onload = (e) => {
              let img = new Image()
              img.src = e.target.result
              file.__img = img
              this.queue.push(file)
              this.__computeTotalSize()
            }
            reader.readAsDataURL(file)
          }

          return file
        })

      this.files = this.files.concat(files)
      this.$emit('add', files)
      this.$emit('total', this.files)
      this.__computeTotalSize()
    },
    __computeTotalSize () {
      this.totalSize = this.length
        ? this.queue.map(f => f.size).reduce((total, size) => total + size)
        : 0
    },
    __remove (file) {
      const
        name = file.name,
        done = file.__doneUploading

      if (this.uploading && !done) {
        this.$emit('remove:abort', file, file.xhr)
        file.xhr.abort()
        this.uploadedSize -= file.__uploaded
      }
      else {
        this.$emit(`remove:${done ? 'done' : 'cancel'}`, file, file.xhr)
      }

      if (!done) {
        this.queue = this.queue.filter(obj => obj.name !== name)
      }

      file.__removed = true
      this.files = this.files.filter(obj => obj.name !== name)
      this.__computeTotalSize()
      this.$emit('total', this.files)
    },
    __removeUploaded () {
      this.files = this.files.filter(f => !f.__doneUploading)
      this.__computeTotalSize()
    },
    __pick () {
      if (!this.addDisabled && this.$q.platform.is.mozilla) {
        this.$refs.file.click()
      }
    },
    __getUploadPromise (file) {
      const
        form = new FormData(),
        xhr = new XMLHttpRequest()

      try {
        form.append('Content-Type', file.type || 'application/octet-stream')
        form.append(this.name, file)
        this.additionalFields.forEach(field => {
          form.append(field.name, field.value)
        })
      }
      catch (e) {
        return
      }

      initFile(file)
      file.xhr = xhr
      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', e => {
          if (file.__removed) { return }
          e.percent = e.total ? e.loaded / e.total : 0
          let uploaded = e.percent * file.size
          this.uploadedSize += uploaded - file.__uploaded
          file.__uploaded = uploaded
          file.__progress = Math.min(99, parseInt(e.percent * 100, 10))
        }, false)

        xhr.onreadystatechange = () => {
          if (xhr.readyState < 4) {
            return
          }
          if (xhr.status && xhr.status < 400) {
            file.__doneUploading = true
            file.__progress = 100
            this.$emit('uploaded', file, xhr)
            resolve(file)
          }
          else {
            file.__failed = true
            this.$emit('fail', file, xhr)
            reject(xhr)
          }
        }

        xhr.onerror = () => {
          file.__failed = true
          this.$emit('fail', file, xhr)
          reject(xhr)
        }

        const resolver = this.urlFactory
          ? this.urlFactory(file)
          : Promise.resolve(this.url)

        resolver.then(url => {
          xhr.open(this.method, url, true)
          if (this.headers) {
            Object.keys(this.headers).forEach(key => {
              xhr.setRequestHeader(key, this.headers[key])
            })
          }

          this.xhrs.push(xhr)
          xhr.send(form)
        })
      })
    },
    upload () {
      const length = this.length
      if (length === 0) {
        return
      }

      let filesDone = 0
      this.uploadedSize = 0
      this.uploading = true
      this.xhrs = []
      this.$emit('start')

      let solved = () => {
        filesDone++
        if (filesDone === length) {
          this.uploading = false
          this.xhrs = []
          this.queue = this.queue.filter(f => !f.__doneUploading)
          this.__computeTotalSize()
          this.$emit('finish')
        }
      }

      this.queue.map(file => this.__getUploadPromise(file))
        .forEach(promise => {
          promise.then(solved).catch(solved)
        })
    },
    abort () {
      this.xhrs.forEach(xhr => { xhr.abort() })
    },
    reset () {
      this.abort()
      this.files = []
      this.queue = []
      this.__computeTotalSize()
      this.$emit('reset')
    },
    totalFiles () {
      return this.files.length
    }
  }
}
</script>

<style type="scss" scoped>
.upload-done  {
	z-index: 2;
	

}

.uploaded-icon{
	z-index: 3;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    text-shadow: 0px 0px 20px #fff;

}
.order {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
</style>
