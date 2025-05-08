<script setup lang="ts">
import { onMounted, ref } from 'vue'

const showPicker = ref(false)
const weekOptions = ref([
    { value: 1, text: '第1周' },
    { value: 2, text: '第2周' },
    { value: 3, text: '第3周' },
    { value: 16, text: '第16周' }
])
const selectedWeek = ref(1);

const togglePicker = () => {
    showPicker.value = !showPicker.value;
}

const confirm = (e: any) => {
    selectedWeek.value = e.value[0].value;
    showPicker.value = false;
    change();
}

const change = () => {
    console.log('当前选择的周:', selectedWeek.value)
}
const safeArea = ref(0);
onMounted(() => {
    const systemInfo = uni.getSystemInfoSync()
    safeArea.value = systemInfo.safeArea.top;
    console.log(safeArea.value);

})
</script>

<template>
    <view :style="{ paddingTop: safeArea + 'px' }">
        <button class="open-button" @click="togglePicker">第{{ selectedWeek }}周</button>
        <u-picker :show="showPicker" :columns="[weekOptions]" keyName="text" @confirm="confirm" @cancel="togglePicker"
            :defaultIndex="[selectedWeek - 1]"></u-picker>
    </view>
</template>

<style scoped>
.open-button {
    font-size: 14px;
}
</style>