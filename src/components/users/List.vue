
<template>
  <div class="box">
<ul class="u-list">
   <router-link tag="li" v-for="user in users"  :to="{name: 'user.profile', prams: {username: user.username}}" class="list-item row">
     <div class="width-1of6">
	     <span>
	     	<img class="avatar" :src="user.avatar" style="width:50px; height: 50px">
	     </span>
     </div>
     <div class="width-3of3" style="padding-top: 5px">
     	<small class="list-item-label text-lighter">{{ user.username }}@</small>
      <span class="list-item-label" v-show="user.name">{{ user.name}}</span>
      <span class="list-item-label" v-show="!user.name">{{ user.username}}</span>
     </div>
   <!-- <div class="width-1of6 text-left" style="padding-top: 7px">
   	     <button class="primary">
   	     	<span>تابع</span>
   	     </button>
   </div> -->
   </router-link>
</ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      users: [
        {
          username: 'thatme',
          location: '4446',
          name: 'حسنين عبدالله',
          avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png'
        },
        {
          username: 'thatme',
          location: '4446',
          name: 'حسنين عبدالله',
          avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png'
        },
        {
          username: 'thatme',
          location: '4446',
          name: '',
          avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png'
        }
      ]
    }
  },
  methods: {
    goTo: function () {
      console.log('g')
    }
  }
}
</script>

<style>
</style>
