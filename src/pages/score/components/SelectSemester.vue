<script setup lang="ts">
import { useClassStore } from '@/stores/modules/classStore';
import { useScoreStore } from '@/stores/modules/scoreStore';
import { ref, onMounted, computed } from 'vue'

const classStore = useClassStore();
const { gradeOptions, semesterOptions } = classStore.semesterList;
const scoreStore = useScoreStore();
const showPicker = ref(false);
const selectedGrade = ref("");
const selectedSemester = ref("");


selectedGrade.value = gradeOptions[Math.ceil(scoreStore.selectedSemester / 2) - 1]
selectedSemester.value = semesterOptions[selectedGrade.value][scoreStore.isAll ? 2 : (scoreStore.selectedSemester + 1) % 2];
const pickerColumns = computed(() => [
    gradeOptions.map((grade: string, index: number) => ({ text: grade, value: grade, index: index })),
    semesterOptions[selectedGrade.value].map((semester: string, index: number) => ({
        text: semester,
        value: semester,
        index: index
    })),
]);

const togglePicker = () => {
    showPicker.value = !showPicker.value;
}
const emit = defineEmits(['change-semester']);
const confirm = async (e: any) => {
    if (e.value[1].index == 2) {
        scoreStore.isAll = true;
        scoreStore.selectedSemester = 2 * e.value[0].index + 1;
    } else {
        scoreStore.isAll = false;
        scoreStore.selectedSemester = 2 * e.value[0].index + e.value[1].index + 1;
    }
    emit('change-semester')
    selectedGrade.value = e.value[0].value;
    selectedSemester.value = e.value[1].value;
    showPicker.value = false;
}



const safeArea = ref(0);
onMounted(() => {
    const systemInfo = uni.getSystemInfoSync();
    safeArea.value = systemInfo.safeArea?.top || 0;
})
</script>

<template>
    <view :style="{ paddingTop: safeArea + 'px' }">
        <button class="open-button" @click="togglePicker">
            {{ selectedGrade + '&nbsp;&nbsp;' }}{{ selectedSemester }}
        </button>

        <u-picker :show="showPicker" :columns="pickerColumns" keyName="text" @confirm="confirm" @cancel="togglePicker"
            :defaultIndex="[
                gradeOptions.findIndex(item => item === selectedGrade),
                semesterOptions[selectedGrade].findIndex(item => item === selectedSemester)
            ]"></u-picker>
    </view>
</template>

<style scoped>
.open-button {
    font-size: 14px;
}
</style>