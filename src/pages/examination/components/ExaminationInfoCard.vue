<script setup lang="ts">

</script>

<template>
    <view class="examination-info-card">
        <view class="left">
            <text class="class-name">课程名称</text>
            <text>地点 大对哇对哇的</text>
            <text>时间 2025-07-10 8:30-10:30</text>
        </view>
        <view class="right">
            <view class="remain-time">
                还剩2222天
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

    .left {
        flex-basis: 75%;
        display: flex;
        flex-direction: column;

        .class-name {
            font-size: 20px;
        }
    }

    .right {
        align-items: center;
        margin: auto;

        .remain-time {
            background: var(--primary-color);
            padding: 3px 5px;
            color: white;
            border-radius: 4px;
        }
    }
}
</style>