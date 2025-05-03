<script setup lang="ts">
const data = [
    { name: "高等数学", credit: 4.0, score: 92, point: 4.0 },
    { name: "大学英语", credit: 3.0, score: 85, point: 3.5 },
    { name: "计算机基础", credit: 2.5, score: 78, point: 3.0 }
]
</script>

<template>
    <view class="examination">
        <view class="header-row">
            <text class="class-name">课程名称</text>
            <text class="class-num">学分</text>
            <text class="class-num">成绩</text>
            <text class="class-num">绩点</text>
        </view>
        <view v-for="(item, index) in data" :key="index"
            :class="['data-row', index % 2 === 0 ? 'bg-white' : 'bg-gray']">
            <text class="class-name">{{ item.name }}</text>
            <text class="class-num">{{ item.credit }}</text>
            <text class="class-num">{{ item.score }}</text>
            <text class="class-num">{{ item.point }}</text>
        </view>
        <view class="bottom">
            <view class="divider-line"></view>
            <text>暂无更多数据</text>
            <view class="divider-line"></view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.examination {
    padding: 20rpx;
    font-size: 14px;
    color: #898989;
}

.header-row,
.data-row {
    display: flex;
    padding: 20rpx;

    .class-name {
        flex-basis: 64%;
    }

    .class-num {
        flex-basis: 12%;
        text-align: center;
    }
}

.header-row,
.bg-gray {
    background-color: #f0f0f0;
}


.bg-white {
    background-color: #ffffff;
}

.bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 12rpx;

    .divider-line {
        height: 1px;
        background-color: #b6b6b6;
        margin: 20rpx 10rpx;
        width: 230rpx;
    }
}
</style>
