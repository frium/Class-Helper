import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScoreStore = defineStore('scoreStore', () => {
    const selectedSemester = ref(0);
    return {
        selectedSemester
    }
})