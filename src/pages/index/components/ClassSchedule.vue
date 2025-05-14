<script setup lang="ts">
import { ref } from 'vue';
import ClassInfoCard from './ClassInfoCard.vue';
import { classInfo } from '@/types/class';

const props = defineProps({
    dateInfo: Array,
    classData: Array
})
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const emit = defineEmits(['select-class'])
const handleShowSchedule = (classInfo: Array<classInfo>) => {
    if (classInfo[0]) {
        emit('select-class', classInfo);

    }
}


</script>

<template>
    <view class="class-schedule">
        <view class="class-detail">
            <view class="class-top">
                <view class="class-date" v-for="(item, index) in props.dateInfo" :key="index">
                    <text>{{ weekDays[index] }}</text>
                    <text style="font-size: 12px">{{ item }}</text>
                </view>
            </view>
            <view class="class-info-out-box grid">
                <view class="class-info" v-for="(item, index)  in props.classData" :key="index">
                    <view @click="handleShowSchedule(classInfo)" v-for="(classInfo, index) in item" :key="index">
                        <ClassInfoCard :style="{ visibility: classInfo[0] ? 'visible' : 'hidden' }"
                            :classInfo="classInfo[0]">
                        </ClassInfoCard>
                    </view>
                </view>
            </view>
        </view>

    </view>

</template>

<style scoped lang="scss">
.class-schedule {
    display: flex;
    padding: 0 10rpx;
    width: 100%;

    .class-detail {
        width: 100%;

        .class-top {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8rpx;

            .class-date {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        .grid {
            height: 100%;
            background-image: radial-gradient(circle, rgb(221, 229, 240) 2px, #f8f8f8 2px);
            background-size: 20px 20px;
            background-position: center center;
        }

        .class-info-out-box {

            background-repeat: repeat;
            width: 100%;
            margin-top: 10rpx;
            display: flex;
            justify-content: space-around;
            gap: 8rpx;

            .class-info {
                width: 25%;
                display: flex;
                flex-direction: column;
                row-gap: 10rpx;
            }
        }

    }
}
</style>