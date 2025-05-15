<script setup lang="ts">
const props = defineProps({
    loading: Boolean
})
</script>

<template>
    <view class="loading-mask" v-if="props.loading">
        <up-loading-icon color="white"></up-loading-icon>
    </view>
</template>

<style scoped lang="scss">
.loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(52, 52, 52, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>