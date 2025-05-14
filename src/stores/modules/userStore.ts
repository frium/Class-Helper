import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const token = ref('');
    const entryYear = ref(0);
    const username = ref('');
    return {
        token,
        entryYear,
        username
    }
}, {
    persist: {
        key: 'user-store',
        storage: {
            getItem(key) {
                return uni.getStorageSync(key)
            },
            setItem(key, value) {
                uni.setStorageSync(key, value)
            }
        }
    }
})