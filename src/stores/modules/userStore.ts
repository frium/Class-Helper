import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const token = ref("");
    return {
        token
    }

})
