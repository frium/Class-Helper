<script setup lang="ts">
import { ref } from 'vue';
import ClassInfoCard from './ClassInfoCard.vue';
import { classInfo } from '@/types/class';

const props = defineProps({
    dateInfo: Array,
    classData: Array as () => classInfo[][][]
})
const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
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
                    <template v-for="(classInfo, index) in item" :key="index">
                        <view v-if="!classInfo[0]" :style="{ height: '18%', 'flex-shrink': '0' }">
                            <ClassInfoCard :style="{ visibility: classInfo[0] ? 'visible' : 'hidden' }"
                                :classInfo="classInfo[0]">
                            </ClassInfoCard>
                        </view>
                        <view v-else :style="{
                            height: `${18 * classInfo[0].lastTime}%`,
                            'flex-shrink': '0'
                        }" @click="handleShowSchedule(classInfo)">
                            <ClassInfoCard :style="{ visibility: classInfo[0] ? 'visible' : 'hidden' }"
                                :classInfo="classInfo[0]">
                            </ClassInfoCard>
                        </view>
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
    height: 100%;

    .class-detail {
        width: 100%;
        height: 100%;

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
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            gap: 8rpx;
            margin-top: 10rpx;

            .class-info {
                width: 25%;
                height: 100%;
                display: flex;
                flex-direction: column;
                row-gap: 10rpx;
            }
        }

    }
}
</style>