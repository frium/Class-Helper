<script setup lang="ts">
import { onMounted, ref } from "vue";
import ExaminationInfoList from './components/ExaminationInfoList.vue';
import { useClassStore } from "@/stores/modules/classStore";
import { getExaminationAPI } from "@/api/exam";
import { getClassData } from "@/types/class";

const classStore = useClassStore();
const semesterValues = Array.from(classStore.semesterInfoMap.values()).reverse();
const examinationList = ref([]);
const requests = semesterValues.map(async (value: getClassData) => {
    const response = await getExaminationAPI(value);
    return response.data.data;
});

Promise.all(requests)
    .then(results => {
        examinationList.value = results;
    })
const safeArea = ref(0);

onMounted(() => {
    const systemInfo = uni.getSystemInfoSync();
    safeArea.value = systemInfo.safeArea?.top || 0;
})
</script>

<template>
    <view class="examination">
        <template v-for="(item, index) in examinationList" :key="index">
            <ExaminationInfoList :dataList="item"></ExaminationInfoList>
        </template>

    </view>
</template>

<style scoped lang="scss">
.examination {
    padding: 0 20rpx;
}
</style>
