<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showPicker = ref(false);
const selectedGrade = ref('大一');
const selectedSemester = ref('上');
const selectedWeek = ref(1);

// 年级选项
const gradeOptions = ref([
    { value: '大一', text: '大一' },
    { value: '大二', text: '大二' },
    { value: '大三', text: '大三' },
    { value: '大四', text: '大四' }
])

// 学期选项
const semesterOptions = ref([
    { value: '上', text: '上' },
    { value: '下', text: '下' },
    { value: '全', text: '全' },
])


const pickerColumns = ref([
    gradeOptions.value,
    semesterOptions.value,
])

const togglePicker = () => {
    showPicker.value = !showPicker.value;
}

const confirm = (e: any) => {
    selectedGrade.value = e.value[0].value;
    selectedSemester.value = e.value[1].value;
    change();
    showPicker.value = false;
}

const change = () => {
    console.log('当前选择:', {
        grade: selectedGrade.value,
        semester: selectedSemester.value,
    })
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
                gradeOptions.findIndex(item => item.value === selectedGrade),
                semesterOptions.findIndex(item => item.value === selectedSemester),
                selectedWeek - 1
            ]"></u-picker>
    </view>
</template>

<style scoped>
.open-button {
    font-size: 14px;
}
</style>