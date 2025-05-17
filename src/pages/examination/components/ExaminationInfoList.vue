<script setup lang="ts">
import { examinationInfo } from "@/types/examination";
import ExaminationInfoCardVue from "./ExaminationInfoCard.vue";
import { useUserStore } from "@/stores/modules/userStore";
import { computed } from "vue";

const userStore = useUserStore();
const props = defineProps({
    dataList: Array<examinationInfo>
});

const semesterTitle = computed(() => {
    const diffNum = parseInt(props.dataList[0].xnm) - userStore.entryYear + 1;
    let data = '';
    if (diffNum === 1) data += '大一 - ';
    else if (diffNum === 2) data += '大二 - ';
    else if (diffNum === 3) data += '大三 - ';
    else if (diffNum === 4) data += '大四 - ';
    data += `第${parseInt(props.dataList[0].xqm) == 3 ? 1 : 2}学期`;
    return data;
})
</script>

<template>
    <view class="examination-info-list">
        <text class="title">{{ semesterTitle }}</text>
        <template v-for="(data, index) in dataList" :key="index">
            <ExaminationInfoCardVue :data="data" />
        </template>
    </view>
</template>

<style scoped lang="scss">
@import url('/src/global.scss');

.examination-info-list {

    .title {
        position: relative;
        color: black;

        display: block;
        padding: 0 20rpx;
        margin: 20rpx 0;
        font-size: 16px;

        &::before {
            content: "";
            position: absolute;
            width: 3px;
            height: 60%;
            top: 25%;
            left: 0;
            background: var(--primary-color);
            border-radius: 8px;
        }
    }


}
</style>