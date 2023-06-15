import { defineStore } from 'pinia'
import axios from 'axios'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos:null,
  }),
  actions: {
    async fetchVideosByUserId(userID) {
        let res = await axios.get('api/youtube/'+ userID)
        this.$state.videos = res.data.videos_by_user
},
    clearVideos() {
        this.$state.videos = null
    }
  },
  persist:true
})