import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const jwt = ref("");
    return {
        jwt
    }

})
