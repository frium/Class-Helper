<script setup lang="ts">
import { classInfo } from "@/types/class";
import { PropType } from "vue";

const props = defineProps({
    classInfo: Object as PropType<classInfo>
});
const weekDays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
</script>

<template>
    <scroll-view scroll-y class="popup-class-info" enable-flex="true">
        <template v-if="!props.classInfo?.isNowWeek">
            <text v-if="props.classInfo?.isNextWeek">[下周]</text>
            <text v-else>[多周后]</text>
        </template>
        <text style="font-size: 14px; font-weight: 600">
            {{ props.classInfo.kcmc + props.classInfo.xslxbj }}</text>
        <view class="info-card">
            <image src="@/static/icons/address.svg" mode="scaleToFill" />
            <text> {{ props.classInfo.cdmc }}</text>
        </view>
        <view class="info-card">
            <image src="@/static/icons/calendar.svg" mode="scaleToFill" />
            <text>{{ weekDays[parseInt(props.classInfo.xqj) - 1] }}&nbsp;{{ props.classInfo.jc }}</text>
        </view>
        <view class="info-card">
            <image src="@/static/icons/week.svg" mode="scaleToFill" />
            <text> {{ props.classInfo.zcd }}</text>
        </view>
        <view class="info-card">
            <image src="@/static/icons/credit.svg" mode="scaleToFill" />
            <text> {{ "学分: " + props.classInfo.xf }}</text>
        </view>
        <view class="info-card">
            <image src="@/static/icons/user.svg" mode="scaleToFill" />
            <text> {{ props.classInfo.xm }}</text>
        </view>
    </scroll-view>
</template>

<style scoped lang="scss">
image {
    width: 14px;
    height: 14px;
}

.popup-class-info {
    display: flex;
    flex-direction: column;
    width: 250rpx;
    height: 250rpx;
    background-color: pink;
    border-radius: 10rpx;
    padding: 25rpx 20rpx;
    color: white;

    .info-card {
        display: flex;
        align-items: center;
        gap: 4px;
    }
}
</style>