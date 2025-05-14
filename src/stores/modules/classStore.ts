import { classAllDeatail, getClassData } from '@/types/class';
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/userStore';

export const useClassStore = defineStore('classStore', () => {
    const userStore = useUserStore();
    const selectedSemester = ref(1);
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
        selectedSemester.value = semesterMap.size;
        return semesterMap;
    });
    const selectedWeek = ref(1);
    const getLocalClassAllDetail = (key: number): classAllDeatail => {
        return uni.getStorageSync(`${userStore.username}_class_${key}`);
    }
    const setLocalClassAllDetail = (key: number, data: classAllDeatail): void => {
        uni.setStorageSync(`${userStore.username}_class_${key}`, data);
    }
    return {
        semesterInfoMap,
        selectedSemester,
        selectedWeek,
        getLocalClassAllDetail,
        setLocalClassAllDetail,
    }
}, {
    persist: {
        key: 'class-store',
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