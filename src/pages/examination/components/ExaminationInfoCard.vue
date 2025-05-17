<script setup lang="ts">
import { examinationInfo } from '@/types/examination';
import { computed, PropType } from 'vue';

const props = defineProps({
    data: Object as PropType<examinationInfo>
})
const timeRemaining = computed(() => {
    const timeStr: string = props.data.kssj.split('(')[0];
    const targetDate: Date = new Date(timeStr);
    const currentDate: Date = new Date();
    return Math.floor((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
});


</script>

<template>
    <view class="examination-info-card">
        <view class="left">
            <text class="class-name">{{ props.data.kcmc }}</text>
            <text>{{ '地点 ' + props.data.cdmc }}</text>
            <text>{{ '时间 ' + props.data.kssj }}</text>
        </view>
        <view class="right">
            <view v-if="timeRemaining >= 0" class="remain-time">
                {{ '还剩' + timeRemaining + '天' }}
            </view>
            <view v-else class="remain-time" style="background-color: #8f939c;">
                {{ '过去' + Math.abs(timeRemaining) + '天' }}
            </view>
        </view>
    </view>

</template>

<style scoped lang="scss">
@import url('/src/global.scss');

.examination-info-card {
    display: flex;
    background: white;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--primary-color);
    margin-top: 20rpx;

    .left {
        flex-basis: 75%;
        display: flex;
        flex-direction: column;

        .class-name {
            color: black;
            font-size: 20px;
        }
    }

    .right {
        align-items: center;
        margin: auto 0;
        margin-left: auto;

        .remain-time {
            background: var(--primary-color);
            padding: 3px 5px;
            color: white;
            border-radius: 4px;
        }
    }
}
</style>