<script setup lang="ts">
import SelectSemester from './components/SelectSemester.vue'
import ScoreCard from './components/ScoreCard.vue';
import TotalDetailVue from './components/TotalDetail.vue';
</script>

<template>
    <view class="score-page">
        <SelectSemester></SelectSemester>
        <TotalDetailVue></TotalDetailVue>
        <ScoreCard></ScoreCard>
        <ScoreCard></ScoreCard>
        <ScoreCard></ScoreCard>
        <ScoreCard></ScoreCard>
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
