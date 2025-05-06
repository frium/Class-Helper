<script setup>
import { ref } from 'vue';

// 创建响应式数据  
const text1 = ref('uview-plus UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用');  
</script>
<template>
    <view>
        <up-notice-bar :text="text1"></up-notice-bar>
    </view>
</template>

<style scoped lang="scss"></style>