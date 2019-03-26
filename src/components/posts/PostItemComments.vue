<template>
	<div>
	      <q-list class="no-padding no-margin " no-border inset-separator> 

		 <q-item multiline v-for="comment in comments.data">
          <q-item-side>
            <q-item-tile avatar class="text-right">
              <avatar :src="comment.user.avatar" height="25px" width="25px"></avatar>
            </q-item-tile>
            <!-- <q-item-tile stamp class="text-right">
            <span>{{comment.user.username}}</span><span>@</span>
            </q-item-tile> -->
          </q-item-side>
          <q-item-main class="text-right">
            <q-item-tile label stamp class="text-dark" style="padding-right: 5px; font-size: 70%">
            <span>{{comment.user.username}}@</span>
               <span>{{ moment(comment.created_at).fromNow() }}</span> 
            </q-item-tile>
            <q-item-tile sublabel style="padding-right: 5px;" class="text-truncate">
               {{comment.body}}
            </q-item-tile>
            
          </q-item-main>
          <q-item-tile stamp class="text-faded">
             <q-icon name="more_vert" @click="moreOptions(comment)"></q-icon>
            </q-item-tile>
        </q-item>
        <q-item @click="loadMoreComments()" v-if="canLoadMore">
          <q-item-main class="text-grey-5 text-center">
            <q-item-tile  label>المزيد من التعليقات {{ canLoadMore }}</q-item-tile>
          </q-item-main>
        </q-item>
		  <!--
		    slot="message" for DOM element to display (in this example
		    a dots spinner) when loading additional content
		  -->
		  <div class="text-center">
<!-- 		   <q-spinner-dots slot="message" :size="40" color="green"></q-spinner-dots>
 -->		  </div>
		 </q-list>
		
    <!-- ############### add comment form ############# -->
  <!-- add comment btn  -->
 <div class="fixed-bottom text-center" style="bottom: 10px">
      <span class="add-btn text-dark" style="z-index: 2" @click="$refs.commentModal.open()">
      اضف تعليق
      <q-icon name="edit" />
      </span>

 </div>

 <!-- add comment form  -->
 <q-modal ref="commentModal" position="bottom" :content-css="{'direction':'rtl', 'padding': '5px'}">
 	<q-item class="no-padding text-right">
 	<q-item-main>
 	<q-field :error="$v.form.body.$error" error-label="هذا الحقل مطلوب">
		
 		<q-input
		  align="left"
		  type="textarea"
		  :max-height="6"
		  v-model="form.body"
		  :loading="false"
		  :autofocus="true"		  
		  placeholder="اكتب تعليق"
		/>
	</q-field>
 	</q-item-main>
 	<q-item-side class="no-margin">
 	 <q-icon name="mail" size="34px" color="primary" v-if="form.body && !postCommentLoading" @click="addCommnet()"/>
 		 	<q-inner-loading :visible="postCommentLoading">
			  <q-spinner-dots size="70px" color="teal-4" />
			</q-inner-loading>
<!--  		 	<q-spinner color="faded" :size="34" v-if="postCommentLoading" />
 -->
 	</q-item-side>
 </q-item>
 </q-modal>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {QIcon, QBtn, QList, QItemSeparator, QItem, QItemSide, QItemMain, QItemTile, QInput, QField, QInnerLoading, QSpinnerDots, QInfiniteScroll, QModal, QModalLayout, ActionSheet, Toast} from 'quasar'
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {QIcon, QBtn, QList, QItemSeparator, QItem, QItemSide, QItemMain, QItemTile, QInput, QField, QInnerLoading, QSpinnerDots, QInfiniteScroll, QModal, QModalLayout, ActionSheet},
  props: ['comments', 'postId', 'count'],
  data () {
    return {
      isAddCommnet: false,
      form: {
        body: ''
      },
      postCommentLoading: false
    }
  },
  computed: {
    ...mapGetters({
    }),
    canLoadMore () {
      if (this.comments) {
        return this.comments.data.length ? this.comments.data.length < this.count : false
      }
    }
  },
  validations: {
    form: {
      body: { required }
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    ...mapActions({
    }),
    addCommnet () {
      let self = this
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return false
      }
      let path = window.apiUrl + '/posts/' + this.postId + '/comments/create'
      let data = {
        body: this.form.body,
        post_id: this.postId
      }
      self.postCommentLoading = true
      axios.post(path, data).then(function (res) {
        self.$refs.commentModal.close()
        self.postCommentLoading = false
        self.form.body = ''
        self.$v.form.$reset()
        // add the new cooment to comment list
        self.comments.data.push(res.data)
        // self.$emit('comment:added', res.data)
      }).catch(function (error) {
        console.log(error)
        self.postCommentLoading = false
      })
    },
    loadMoreComments (index, done) {
      if (index) {
        this.moreCommentsLoading = false
        return false
      }
      let self = this
      // self.moreCommentsLoading = true
      // if (self.moreCommentsLoading) {
      //   return false
      // }
      // get last loaded comment
      // let lastItem = this.comments[this.comments.length - 1].created_at
      let page = this.comments.current_page + 1
      let path = window.apiUrl + '/posts/' + this.postId + '/comments/loadMore?page=' + page
      axios.get(path).then(function (res) {
        console.log(res.data.data.length)
        if (res.data.data.length !== 0) {
          console.log(res.data)
          // stop loading spinner
          self.moreCommentsLoading = false
          for (var i = 0; i < res.data.data.length; i++) {
            console.log(res.data.data[i])
            self.comments.data.push(res.data.data[i])
            self.comments.current_page = res.data.current_page
          }
        }
        // no more comments? hide load more comments btn then stop
        self.moreCommentsBtn = false
        console.log(self.comments)
      }).catch(function (error) {
        console.log(error)
      })
    },
    deleteComment (comment) {
      let self = this
      let path = window.apiUrl + '/posts/' + this.postId + '/comments/' + comment.id + '/delete'
      // remove comment from list to speed up the user feedback
      let index = this.comments.indexOf(comment)
      this.comments.splice(index, 1)
      // then real removing from server
      axios.post(path).then(function (res) {
        self.$emit('comment:deleted', res.data)
        Toast.create.info('تم حذف التعليق')
      }).catch(function (error) {
        Toast.create.negative('حدث خطا')
        console.log(error)
      })
    },
    reportComment () {
    },
    moreOptions (comment) {
      let self = this
      ActionSheet.create({
        // title: '<span class="text-center text-primary">erfreferf</span>',
        gallery: true,
        actions: [
          {
            label: 'حذف التعليق',
            icon: 'delete_forever',
            handler () {
              self.deleteComment(comment)
            }
          },
          {
            label: 'ابلاغ عن التعليق',
            icon: 'bug_report',
            handler () {
              console.log('Batman.')
            }
          }
        ]
      })
    }
  }
}
</script>

<style type="text/scss" scoped>
	.bg-blur {
    filter: blur(3px);
    background: green;
  }
  .add-btn {
/*    text-shadow: 1px 2px 1px black, 0 0 2px #f5f5f5, 0 0 2px black;
*/    width: 150px;
    background: rgba(255, 255, 255, 0.51);
    padding: 5px;
    z-index: 0;
    border-radius: 13px;
    &:before {
      background: red;
      z-index: 5;
      width: 44vh;
      height: 44vh;
      position: relative;
    }
  }
</style>
