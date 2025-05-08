<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);

</script>

<template>
    <view class="score-card" @click="show = true">
        <div class="left">
            <text class="class-name">高等代数</text>
            <text class="credit"> 2.0学分</text>
            <text> 老师名称</text>
        </div>
        <div class="right">
            <text class="score"> 100</text>
            <text>绩点 5.0</text>
        </div>
    </view>
    <up-popup v-model:show="show" bgColor="transparent">
        <view class="popup-box">
            <text class="class-name">课程名称</text>
            <view class="grid-table">
                <view class="grid-item">张三</view>
                <view class="grid-item">90</view>
                <view class="grid-item">李四</view>
                <view class="grid-item">85</view>
                <view class="grid-item">李四</view>
                <view class="grid-item">85</view>
            </view>
        </view>
    </up-popup>
</template>

<style scoped lang="scss">
@import url('/src/global.scss');

.score-card {
    box-sizing: border-box;
    display: flex;
    background: white;
    border: 1px solid var(--primary-color);
    padding: 6px 10px;
    border-radius: 8px;

    .left {
        flex-basis: 70%;
        text-align: left;

        .class-name {
            display: block;
            font-size: 20px;
        }
    }

    .right {
        flex-basis: 30%;
        text-align: right;

        .score {
            display: block;
            font-size: 20px;
            color: pink;
            font-weight: 600;

        }
    }
}

.popup-box {
    border-radius: 10px 10px 0 0;
    width: 750rpx;

    background: #ffffff;
    overflow: hidden;
    padding: 20px;

    .class-name {
        position: relative;
        display: block;
        font-size: 14px;

        &::before {
            content: "";
            position: absolute;
            left: -8px;
            top: 10%;
            width: 4px;
            height: 90%;
            background: var(--primary-color);
            border-radius: 5px;
        }
    }
}

.grid-table {
    display: grid;
    margin-top: 15px;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--primary-color);
    ;
    border-radius: 4px;
    overflow: hidden;
}


.grid-item {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid var(--primary-color);
    ;
    border-right: 1px solid var(--primary-color);
    ;
}

.grid-header:nth-child(2n),
.grid-item:nth-child(2n) {
    border-right: none;
}

.grid-item:nth-last-child(-n+2) {
    border-bottom: none;
}
</style>