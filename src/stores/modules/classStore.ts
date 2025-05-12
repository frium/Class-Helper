import { getClassData } from '@/types/class';
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/userStore';

export const useClassStore = defineStore('classStore', () => {
    const userStore = useUserStore();
    const semesterInfoMap = computed<Map<number, getClassData>>(() => {
        let num: number = 0;
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        num = (year - userStore.entryYear) * 2;
        if (month > 7) {
            num += 1;
        }
        num = Math.min(num, 8);
        const semesterMap: Map<number, getClassData> = new Map();
        for (let i = 1; i <= num; i++) {
            const semesterInfo: getClassData = {
                xnm: userStore.entryYear + Math.floor((i - 1) / 2) + "",
                xqm: i % 2 == 0 ? '12' : '3'
            }
            semesterMap.set(i, semesterInfo);
        }
        return semesterMap;
    })
    const selectedSemester = ref(semesterInfoMap.value.size);
    return {
        semesterInfoMap,
        selectedSemester
    }
})