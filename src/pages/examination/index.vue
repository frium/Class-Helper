<script setup lang="ts">
import { onMounted, ref } from "vue";
import ExaminationInfoCard from "./components/ExaminationInfoCard.vue";
import SelectSemester from "../score/components/SelectSemester.vue";
const safeArea = ref(0);
onMounted(() => {
    const systemInfo = uni.getSystemInfoSync();
    safeArea.value = systemInfo.safeArea?.top || 0;
})
</script>

<template>
    <view class="examination">
        <SelectSemester></SelectSemester>
        <ExaminationInfoCard>
        </ExaminationInfoCard>
    </view>
</template>

<style scoped lang="scss">
.examination {
    padding: 0 20rpx;
}
</style>
