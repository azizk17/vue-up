<template>
  <page>
  	<div slot="content" v-if="post">
  		<post-item  :item="post"  :showComments="true">
      <q-card-main slot="comments" class=" no-margin ">
        <post-item-comments v-if="post.comments" :comments="post.comments" :postId="post.id" :count="post.count_comments">
                  
                </post-item-comments>
      </q-card-main>
      </post-item>
  	</div>
  </page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PostItemComments from './PostItemComments'
import {QCardMain} from 'quasar'
export default {
  components: {PostItemComments, QCardMain},
  props: ['item'],
  data () {
    return {
      post: {},
      error: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth',
      authUser: 'auth/user'
    })
  },
  created: function () {
    let path = '/guests/posts/' + this.$route.params.id + '/show'
    if (this.auth) {
      path = '/posts/' + this.$route.params.id + '/show'
    }
    // if post not defined, make server call to fetch data by post id
    if (!this.item) {
      this.fetchData(path)
    }
  },
  mounted: function () {
    this.fillData()
  },
  methods: {
    ...mapActions({
    }),
    fetchData: function (path) {
      let self = this
      this.loading = true
      this.error = false
      window.axios.get(window.apiUrl + path).then(function (res) {
        self.$nextTick(() => {
          self.post = res.data
        })
        self.loading = false
      }).catch(res => {
        this.loading = false
        this.error = true
      })
    },
    fillData () {
      this.post = this.item
    },
    openCommentsPage: function (comments) {
      this.comments = comments
      this.$refs.allComments.$refs.comments.open()
    },
    addComment (comment) {
      this.post.comments.push(comment)
    },
    deleteComment (comment) {
      let index = this.post.comments.indexOf(comment)
      this.post.comments.splice(index, 1)
    }
  }
}

</script>

<style>
</style>
