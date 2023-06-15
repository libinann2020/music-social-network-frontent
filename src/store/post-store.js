import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts:null,
  }),
  actions: {
    async fetchPostsByUserId(userID) {
        let res = await axios.get('api/user/'+ userID + '/posts')
        this.$state.posts = res.data
    },
    postImage(image) {
        return process.env.VUE_APP_API_URL + 'images/posts/' + image
    },
    clearPosts() {
        this.$state.posts = null
    }
  },
  persist:true
})