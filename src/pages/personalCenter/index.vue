<script setup>
import UserInfo from "./components/UserInfo.vue";
import LoginForm from "./components/LoginForm.vue"
import { ref } from 'vue';

const show = ref(false);  
</script>
<template>
    <view class="personal-center" @click="show = true">
        <UserInfo></UserInfo>
    </view>

    <up-popup v-model:show="show" bgColor="transparent" mode="center">
        <LoginForm></LoginForm>
    </up-popup>
</template>

<style scoped lang="scss">
.personal-center {
    padding: 20rpx 20rpx 0 20rpx;
}
</style>