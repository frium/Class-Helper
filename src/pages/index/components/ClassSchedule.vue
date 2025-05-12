<script setup lang="ts">
import ClassInfoCard from './ClassInfoCard.vue';

const props = defineProps({
    dateInfo: Array,
    classData: Array
})
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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

            <view class="class-info-out-box">
                <view class="class-info" v-for="item in props.classData" :key="item">
                    <template v-for="classInfo in item" :key="classInfo">
                        <ClassInfoCard :style="{ visibility: classInfo ? 'visible' : 'hidden' }" :classInfo="classInfo">
                        </ClassInfoCard>
                    </template>
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
            display: flex;
            justify-content: space-around;

            .class-date {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        .class-info-out-box {
            width: 100%;
            margin-top: 10rpx;
            display: flex;
            justify-content: space-around;
            gap: 10rpx;

            .class-info {
                width: 25%;
                display: flex;
                flex-direction: column;
                gap: 10rpx;
            }
        }

    }
}
</style>