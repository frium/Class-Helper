<script setup lang="ts">
import ClassInfoCard from './ClassInfoCard.vue';
</script>

<template>
    <view class="class-schedule">
        <view class="class-time">
        </view>
        <view class="class-detail">
            <view class="class-top">
                <view class="class-date" v-for="(item, index) in 7" :key="index">
                    <text>周一</text>
                    <text style="font-size: 12px">4/26</text>
                </view>
            </view>

            <view class="class-info-out-box">
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
                <view class="class-info">
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                    <ClassInfoCard></ClassInfoCard>
                </view>
            </view>


        </view>
    </view>

</template>

<style scoped lang="scss">
.class-schedule {
    width: 750rpx;
    display: flex;
    padding: 0 20rpx;

    .class-time {
        width: 50rpx;
        height: 100vh;
        padding: 5rpx;
        background: blanchedalmond;
    }

    .class-detail {

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
            margin-top: 10rpx;
            display: flex;
            justify-content: space-around;
            gap: 10rpx;

            .class-info {
                display: flex;
                flex-direction: column;
                gap: 10rpx;
            }
        }

    }
}
</style>