import { classAllDeatail, getClassData } from '@/types/class';
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
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
    const miniWeek = ref<boolean[][][]>();

    const semesterList = computed(() => {
        const yearNames = ["大一", "大二", "大三", "大四"];
        const semesterOptions = {}; // 存储每个年级的学期选项

        let year = 0;
        let semesterInYear = 0;
        let realCount = 0;

        while (realCount < semesterInfoMap.value.size) {
            const term = semesterInYear === 0 ? "上" : "下";
            const currentYear = yearNames[year];
            realCount++;

            if (!semesterOptions[currentYear]) {
                semesterOptions[currentYear] = [];
            }

            if (!semesterOptions[currentYear].includes(term)) {
                semesterOptions[currentYear].push(term);
            }

            if (semesterInYear === 1) {
                semesterOptions[currentYear].push("全"); // 添加“全”学期
                year++;
                semesterInYear = 0;
            } else {
                semesterInYear = 1;
            }
        }

        return {
            gradeOptions: yearNames.slice(0, year), // 只包含实际存在的年级
            semesterOptions, // 每个年级对应的学期
        };
    });


    return {
        semesterInfoMap,
        selectedSemester,
        selectedWeek,
        miniWeek,
        semesterList,
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