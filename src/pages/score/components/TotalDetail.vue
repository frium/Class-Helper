<script setup lang="ts">

</script>

<template>
    <view class="total-detail">
        <view class="detail">
            <text>总学分</text>
            <text class="number">123</text>
        </view>
        <view class="detail">
            <text>平均绩点</text>
            <text class="number">123</text>
        </view>
        <view class="detail">
            <text>合格数</text>
            <text class="number">123</text>
        </view>
        <view class="detail">
            <text>挂科数</text>
            <text class="number">123</text>
        </view>
    </view>

</template>

<style scoped lang="scss">
@import url('/src/global.scss');

.total-detail {
    display: flex;
    justify-content: space-around;
    background: white;
    padding: 8px 0px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;

    .number {
        display: block;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>