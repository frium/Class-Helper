<script setup lang="ts">

</script>

<template>
    <view class="user-info">
        <image class="avatar" src="https://static.frium.top/blog/blogDefaultAvatar.jpg" />
        <text class="username">username</text>
    </view>
</template>

<style scoped lang="scss">
.user-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    background: white;
    align-items: center;
    padding: 0 10px;
    border-radius: 8px;

    .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid rgb(208, 208, 208);
    }

    .username {
        font-size: 16px;
    }
}
</style>