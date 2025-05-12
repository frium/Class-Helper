<script setup lang="ts">
import SelectSemesterWeek from './components/SelectSemesterWeek.vue';
import ClassSchedule from './components/ClassSchedule.vue';
import { onMounted, reactive } from 'vue';
import { getClassAPI } from '@/api/class';
import { getClassData } from '@/types/class';

//获取所有课表
const selectInfo = reactive<getClassData>({
  xnm: '',
  xqm: ''
});
onMounted(() => {
})
</script>

<template>
  <SelectSemesterWeek></SelectSemesterWeek>
  <ClassSchedule></ClassSchedule>
</template>
<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
