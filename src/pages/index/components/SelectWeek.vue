<script setup lang="ts">
import { ref } from 'vue';

const selectedWeek = ref(0);
const showPopup = ref(false);

const weekOptions = ref([
    { value: 0, text: "本周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
    { value: 1, text: "下周" },
]);

const togglePopup = () => {
    showPopup.value = !showPopup.value;
};

const change = () => {
    console.log(321321);
    showPopup.value = false;
};
</script>

<template>
    <view class="container">
        <button class="open-button" @click="togglePopup">第x周</button>
        <view class="select-week" v-if="showPopup">
            <view class="popup-mask" @click="togglePopup"></view>
            <view class="popup-content">
                <view class="popup-header">
                    <text>选择周</text>
                    <text class="close-btn" @click="togglePopup">×</text>
                </view>
                <view class="week-options">
                    <view v-for="option in weekOptions" :key="option.value" class="option"
                        :class="{ 'selected': selectedWeek === option.value }"
                        @click="selectedWeek = option.value; change()">
                        {{ option.text }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.container {
    position: relative;
}

.open-button {
    width: 750rpx;
    background-color: transparent;
    font-size: 16px;
}

.select-week {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}

.popup-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.popup-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 16px;
    animation: slide-up 0.3s ease;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    font-weight: bold;
}

.close-btn {
    font-size: 24px;
    color: #999;
}

.week-options {
    padding: 12px 0;
    max-height: 180px;
    overflow-y: auto;
}

.option {
    padding: 12px 0;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;

    &.selected {
        color: #007aff;
    }
}

@keyframes slide-up {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}
</style>