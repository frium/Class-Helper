<script setup lang="ts">
import SelectSemester from './components/SelectSemester.vue'
import ScoreCard from './components/ScoreCard.vue';
import TotalDetailVue from './components/TotalDetail.vue';
import Loading from '@/components/Loading.vue'
import { onShow } from '@dcloudio/uni-app';
import { getScoreAPI } from '@/api/score';
import { useClassStore } from '@/stores/modules/classStore';
import { useScoreStore } from '@/stores/modules/scoreStore';
import { computed, ref } from 'vue';
import { scoreTotalDetail } from '@/types/score';
import { getClassData } from '@/types/class';

const classStore = useClassStore();
const scoreStore = useScoreStore();
const scoreInfoArr = ref([]);
const scoreTotalDetail = computed<scoreTotalDetail>(() => {
    let totalScore = 0;
    let allScore = 0;
    let passNum = 0;

    for (let i = 0; i < scoreInfoArr.value.length; i++) {
        const xf = Number(scoreInfoArr.value[i].xf) || 0;
        const jd = Number(scoreInfoArr.value[i].jd) || 0;
        totalScore += xf;
        allScore += jd * xf;
        if (jd > 0) passNum++;
    }
    return {
        totalScore: totalScore,
        gpa: totalScore > 0 ? parseFloat((allScore / totalScore).toFixed(2)) : 0,
        passNumber: passNum,
        failNumber: scoreInfoArr.value.length - passNum
    };
});
const loading = ref(false);
const handelChangeSemester = async () => {
    loading.value = true;
    const mapInfo: getClassData = {
        xnm: '',
        xqm: ''
    };
    mapInfo.xnm = classStore.semesterInfoMap.get(scoreStore.selectedSemester).xnm;

    if (!scoreStore.isAll) {
        mapInfo.xqm = classStore.semesterInfoMap.get(scoreStore.selectedSemester).xqm;
    }
    const res = await getScoreAPI(mapInfo);
    scoreInfoArr.value = res.data.data.list;
    loading.value = false;
}
onShow(async () => {
    loading.value = true;
    scoreStore.selectedSemester = classStore.semesterInfoMap.size - 1;
    const res = await getScoreAPI(classStore.semesterInfoMap.get(scoreStore.selectedSemester));
    scoreInfoArr.value = res.data.data.list;
    loading.value = false;
    console.log(classStore.semesterList);

})
</script>

<template>
    <Loading :loading="loading"></Loading>
    <view v-if="!loading" class="score-page">
        <SelectSemester @change-semester="handelChangeSemester"></SelectSemester>
        <TotalDetailVue :data="scoreTotalDetail"></TotalDetailVue>
        <template v-for="(item, index) in scoreInfoArr" :key="index">
            <ScoreCard :data="item"></ScoreCard>
        </template>
        <view class="hr"></view>
    </view>

</template>

<style scoped lang="scss">
.score-page {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10rpx 20rpx 20rpx 20rpx;
    color: black;

    .hr {
        width: 90%;
        height: 1px;
        background: #e0e0e0;
        position: relative;
        margin: 20px auto;
        margin-bottom: 10px;

        &::before {
            content: '暂未更多数据';
            position: absolute;
            width: 25%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f8f8f8;
            text-align: center;
            font-size: 12px;
            color: #8f8f8f;
        }
    }
}
</style>
