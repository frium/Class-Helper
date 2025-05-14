<script setup lang="ts">
import { useClassStore } from '@/stores/modules/classStore';
import { classInfo } from '@/types/class';
import { PropType } from 'vue';
const props = defineProps({
    classInfo: Object as PropType<classInfo>
})
</script>

<template>
    <view class="class-info-card" v-if="props.classInfo?.isNowWeek">
        <text>{{ props.classInfo?.kcmc }}</text>
        <text style="font-size: 10px; margin-top: 2px;">{{ "@" + props.classInfo?.cdmc }}</text>
    </view>
    <view :class="{
        'class-info-card-next-week': props.classInfo?.isNextWeek,
        'class-info-card-not-now': !props.classInfo?.isNextWeek
    }" v-else>
        <text v-if="props.classInfo?.isNextWeek">[下周]</text>
        <text v-else>[多周后]</text>
        <text>{{ props.classInfo?.kcmc }}</text>
        <text style="font-size: 10px; margin-top: 2px;">{{ "@" + props.classInfo?.cdmc }}</text>
    </view>
</template>

<style scoped lang="scss">
.class-info-card-not-now {
    background: rgb(220, 220, 220);
    color: #757575;


}

.class-info-card-next-week {
    background: rgb(220, 220, 220);
    color: #626262;
}

.class-info-card {
    background: rgb(111, 119, 237);
    color: #f1f1f1;

}

.class-info-card-not-now,
.class-info-card-next-week,
.class-info-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16vh;
    padding: 4px;
    border-radius: 10rpx;
    overflow-y: auto;

    text {
        word-break: break-all;
    }
}
</style>