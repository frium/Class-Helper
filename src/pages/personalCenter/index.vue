<script setup>
import UserInfo from "./components/UserInfo.vue";
import LoginForm from "./components/LoginForm.vue"
import { ref } from 'vue';
const show = ref(false);

const handleLoginSuccess = () => {
    uni.showToast({
        title: '登录成功!',
        icon: 'success',
        duration: 1500
    });
    show.value = false;
    setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' });
    }, 1500)
}

</script>
<template>
    <view class="personal-center" @click="show = true">
        <UserInfo></UserInfo>
    </view>

    <up-popup v-model:show="show" bgColor="transparent" mode="center">
        <LoginForm @login-success="handleLoginSuccess"></LoginForm>
    </up-popup>
</template>

<style scoped lang="scss">
.personal-center {
    padding: 20rpx 20rpx 0 20rpx;
}
</style>