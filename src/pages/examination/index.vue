<script setup lang="ts">
import { onMounted, ref } from "vue";
import ExaminationInfoList from './components/ExaminationInfoList.vue';
import { useClassStore } from "@/stores/modules/classStore";
import { getExaminationAPI } from "@/api/exam";
import { getClassData } from "@/types/class";
import Loading from '@/components/Loading.vue'
import { onPullDownRefresh } from "@dcloudio/uni-app";

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
        loading.value = false;
    })
const safeArea = ref(0);
const loading = ref(false);

onMounted(() => {
    loading.value = true;
    const systemInfo = uni.getSystemInfoSync();
    safeArea.value = systemInfo.safeArea?.top || 0;
})

onPullDownRefresh(() => {
    loading.value = true;
    Promise.all(requests)
        .then(results => {
            examinationList.value = results;
            loading.value = false;
        })
})
</script>

<template>
    <Loading :loading="loading"></Loading>
    <view class="examination">
        <view :style="{ paddingTop: (safeArea + 12) + 'px', color: 'black', textAlign: 'center', fontSize: '14px' }">
            考试日程
        </view>
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
