<script setup lang="ts">
import { LoginData } from '@/types/auth';
import { getUserInfoAPI, loginAPI } from '@/api/user';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/modules/userStore';
const userInfo = reactive<LoginData>({
    username: '',
    password: ''
})
const userStore = useUserStore();
const emit = defineEmits(['login-success'])
const submitForm = async () => {
    if (userInfo.username == '') {
        uni.showModal({
            content: '请输入用户名',
            showCancel: false,
            confirmText: '确定'
        });
        return;
    } else if (userInfo.password === '') {
        uni.showModal({
            content: '请输入密码',
            showCancel: false,
            confirmText: '确定'
        });
        return;
    }
    const res = await loginAPI(userInfo);
    const { code, data, msg } = res.data;
    if (code != 1) {
        uni.showToast({
            title: msg,
            icon: 'none',
            duration: 1500
        });
        return;
    }
    userStore.token = data;
    getUserInfo();
    emit('login-success');
    userInfo.username = "";
    userInfo.password = "";
}
const getUserInfo = async () => {
    const res = await getUserInfoAPI();
    const { code, data, msg } = res.data;
    if (code != 1) {
        uni.showToast({
            title: msg,
            icon: 'none',
            duration: 1500
        });
        return;
    }
    userStore.entryYear = data.entryYear;
    userStore.username = data.username;
}
</script>

<template>
    <view class="form-container">
        <view class="form-item">
            <text class="label">用户名</text>
            <input v-model="userInfo.username" placeholder="请输入用户名" class="input" />
        </view>

        <view class="form-item">
            <text class="label">密码</text>
            <input v-model="userInfo.password" placeholder="请输入密码" password class="input" />
        </view>

        <button @tap="submitForm" class="submit-btn">
            提交
        </button>
    </view>
</template>


<style lang="scss" scoped>
@import url('/src/global.scss');

.form-container {
    width: 650rpx;
    padding: 15px 20px;
    background: white;
    border-radius: 8px;

    .form-item {
        margin-bottom: 30rpx;

        .label {
            position: relative;
            display: block;
            margin-bottom: 10rpx;
            font-size: 28rpx;
            color: #333;
            margin-left: 6px;

            &::before {
                content: "";
                position: absolute;
                left: -10px;
                top: 4px;
                width: 3px;
                height: 12px;
                border-radius: 3px;
                background: var(--primary-color);
            }
        }

        .input {
            width: 100%;
            height: 80rpx;
            padding: 0 20rpx;
            border: 1rpx solid #ddd;
            border-radius: 8rpx;
            font-size: 28rpx;
        }
    }

    .submit-btn {
        margin-top: 50rpx;
        background-color: var(--primary-color);
        color: white;
        font-size: 16px;

    }
}
</style>