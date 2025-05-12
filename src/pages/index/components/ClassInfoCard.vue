<script setup lang="ts">
import { classInfo } from '@/types/class';
import { PropType } from 'vue';
const props = defineProps({
    classInfo: Object as PropType<classInfo>
})
</script>

<template>
    <view class="class-info-card">
        <text>{{ props.classInfo?.kcmc }}</text>
        <text style="font-size: 10px; margin-top: 2px;">{{ "@" + props.classInfo?.cdmc }}</text>
    </view>
</template>

<style scoped lang="scss">
.class-info-card {
    display: flex;
    flex-direction: column;
    width: 90rpx;
    background: rgb(111, 119, 237);
    height: 16vh;
    padding: 4px;
    border-radius: 10rpx;
    color: #f1f1f1;
    overflow-y: auto;

    text {
        word-break: break-all;
    }
}
</style>