<script setup lang="ts">
import { getClassAPI } from '@/api/class';
import { useClassStore } from '@/stores/modules/classStore';
import { onMounted, ref } from 'vue'

const show = ref<boolean>(false);
const classStore = useClassStore();
const togglePicker = () => {
    show.value = !show.value;
}

const selectSemester = (num: number) => {
    classStore.selectedSemester = num;
    classStore.selectedWeek = 1;
    show.value = false;
}


const safeArea = ref(0);
const handelChangeSelectWeek = (weekIndex: number) => {
    classStore.selectedWeek = weekIndex + 1;
}
onMounted(async () => {
    const systemInfo = uni.getSystemInfoSync();
    safeArea.value = systemInfo.safeArea.top;
})

</script>

<template>
    <view :style="{ paddingTop: safeArea + 'px' }">
        <button class="open-button" @click="togglePicker">第{{ classStore.selectedWeek }}周</button>
        <up-popup v-model:show="show" bgColor="transparent">
            <view class="top">
                <text style="font-size: 14px; margin: 10px 0 0 5px;">切换课表</text>
                <scroll-view class="semester-container" scroll-x="true" enable-flex>
                    <view class="semester-out-box">
                        <view style="display:flex;flex-direction: column; position: relative;"
                            v-for="(item, index) in classStore.semesterInfoMap.size" :key="index">
                            <view class="semester" @click="selectSemester(item)"
                                :style="{ background: item === classStore.selectedSemester ? '#47a6f3' : '#e6e6e6' }">
                            </view>
                            <view style="text-align: center;">
                                <text>大</text>
                                <text v-if="item <= 2">一</text>
                                <text v-else-if="item <= 4">二</text>
                                <text v-else-if="item <= 6">三</text>
                                <text v-else-if="item <= 8">四</text>
                                <text v-if="item % 2 != 0"> 上</text>
                                <text v-else> 下</text>
                            </view>
                            <image v-if="item === classStore.selectedSemester" src="@/static/icons/tick.svg"
                                mode="scaleToFill" class="selected-semester" />
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="bottom">
                <text style="font-size: 14px; margin: 10px 0 0 5px;">切换周</text>
                <scroll-view class="week-container" scroll-x="true" enable-flex>
                    <view class="week-out-box">
                        <view class="week-item "
                            :style="{ background: classStore.selectedWeek == (weekIndex + 1) ? 'white' : '#f7f7f7' }"
                            v-for="(week, weekIndex) in classStore.miniWeek" :key="weekIndex"
                            @click="handelChangeSelectWeek(weekIndex)">
                            <text v-if="classStore.selectedWeek == weekIndex + 1" class="now-week"></text>
                            <view class="mini-grid week">
                                <view v-for="(day, dayIndex) in week" :key="dayIndex" class="row">
                                    <view v-for="(classStatus, classStatusIndex) in day" :key="classStatusIndex"
                                        class="cell" :style="{ backgroundColor: classStatus ? '#58dfd3' : '#e6e6e6' }">
                                    </view>
                                </view>
                            </view>
                            <text>{{ '第' + (weekIndex + 1) + '周' }}</text>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </up-popup>
    </view>
</template>

<style scoped lang="scss">
@import url('/src/global.scss');

.open-button {
    font-size: 14px;
}

.mini-grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    transform: rotate(-90deg) scaleX(-1);
}

.row {
    flex: 1;
    display: flex;
    gap: 2px;
    border-radius: 2px;
}

.cell {
    flex: 1;
    border-radius: 2px;
}

.top,
.bottom {
    width: 700rpx;
    background: #f7f7f7;
    border-radius: 10rpx;
    padding: 15rpx;
    margin: 25rpx auto;
}

.top {
    .semester-container {
        width: 100%;
        white-space: nowrap;
        padding: 20rpx 0;
    }

    .semester-out-box {
        display: flex;
        gap: 20rpx;
        padding: 10rpx;
        margin-top: 5px;

        .semester {
            width: 100rpx;
            height: 100rpx;
            border-radius: 10%;
            margin: 0;
        }

        .selected-semester {
            position: absolute;
            top: 15rpx;
            left: 15rpx;
            width: 70rpx;
            height: 70rpx;
        }

    }
}

.bottom {

    .week-container {
        width: 100%;
        white-space: nowrap;
        padding: 20rpx 0;
    }

    .week-out-box {
        display: inline-flex;
        flex-direction: row;
        padding: 0 20rpx;
    }

    .week-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40rpx 25rpx 10rpx 25rpx;
        border-radius: 8px;

        .now-week::before {
            position: absolute;
            content: "(本周)";
            top: 4rpx;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .week {
        width: 70rpx;
        height: 70rpx;
        border-radius: 10%;
    }


}
</style>