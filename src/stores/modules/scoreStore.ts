import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useClassStore } from './classStore';

export const useScoreStore = defineStore('scoreStore', () => {
    const classStore = useClassStore();
    const selectedSemester = ref(classStore.semesterInfoMap.size);
    const isAll = ref(false);
    return {
        isAll,
        selectedSemester
    }
})