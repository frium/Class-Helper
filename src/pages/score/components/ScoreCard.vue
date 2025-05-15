<script setup lang="ts">
import { PropType, ref } from 'vue';
import { scoreInfo } from '@/types/score';
const show = ref(false);
const props = defineProps({
    data: Object as PropType<scoreInfo>
})

</script>

<template>
    <view class="score-card" :style="{ borderColor: parseInt(props.data.cj) >= 90 ? '#19be6b' : '#2979ff' }"
        @click="show = true">
        <div class="left">
            <text class="class-name">{{ props.data.kcmc }}</text>
            <text>{{ props.data.kcxzmc + ' · ' }}</text>
            <text class="credit"> {{ props.data.xf + '学分 · ' }}</text>
            <text>{{ props.data.js }}</text>
        </div>
        <div class="right">
            <text class="score" :style="{ color: parseInt(props.data.cj) >= 90 ? '#19be6b' : '#2979ff' }"> {{
                props.data.cj }}</text>
            <text>{{ '绩点 ' + props.data.jd }}</text>
        </div>
    </view>
    <up-popup v-model:show="show" bgColor="transparent">
        <view class="popup-box">
            <text class="class-name">课程名称</text>
            <view class="grid-table">
                <template v-for="(item, index) in props.data.details" :key="index">
                    <view v-if="index === props.data.details.length - 1" class="grid-item">{{ item.name + '(100%)' }}
                    </view>
                    <view v-else class="grid-item">{{ item.name + '(' + item.percent * 100 + '%)' }}</view>
                    <view class="grid-item">{{ item.score }}</view>
                </template>
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
            font-size: 22px;
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
    border-radius: 4px;
    overflow: hidden;
}


.grid-item {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid var(--primary-color);
    border-right: 1px solid var(--primary-color);
}

.grid-header:nth-child(2n),
.grid-item:nth-child(2n) {
    border-right: none;
}

.grid-item:nth-last-child(-n+2) {
    border-bottom: none;
}
</style>