<script setup lang="ts">
import SelectSemester from './components/SelectSemester.vue';
import ExaminationCard from './components/ExaminationCard.vue';
const data = [
    { name: "高等数学", credit: 4.0, score: 92, point: 4.0 },
    { name: "大学英语", credit: 3.0, score: 85, point: 3.5 },
    { name: "计算机基础", credit: 2.5, score: 78, point: 3.0 }
]
</script>

<template>
    <view class="score-page">
        <SelectSemester></SelectSemester>
        <ExaminationCard></ExaminationCard>
        <ExaminationCard></ExaminationCard>
        <ExaminationCard></ExaminationCard>
        <ExaminationCard></ExaminationCard>
    </view>

</template>

<style scoped lang="scss">
.score-page {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20rpx;
}
</style>
