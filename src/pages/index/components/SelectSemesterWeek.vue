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
    show.value = false;
}


const safeArea = ref(0);
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
                        <view class="week-item" v-for="(item, index) in 20" :key="index">
                            <view class="week"></view>
                            <view style="text-align: center;">
                                <text style="font-size:10px;">第</text>
                                <text style="font-size:12px;">{{ index + 1 }}</text>
                                <text style="font-size:10px;">周</text>
                            </view>
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

.top,
.bottom {
    width: 700rpx;
    background: white;
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
            background: #e6e6e6;
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
        gap: 20rpx;
        padding: 0 20rpx;
    }

    .week-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .week {
        width: 70rpx;
        height: 70rpx;
        background: #e6e6e6;
        border-radius: 10%;
    }


}
</style>