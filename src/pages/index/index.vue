<script setup lang="ts">
import SelectSemesterWeek from './components/SelectSemesterWeek.vue';
import ClassSchedule from './components/ClassSchedule.vue';
import { getClassAPI } from '@/api/class';
import { useClassStore } from '@/stores/modules/classStore';
import { onMounted, reactive, ref, watch } from 'vue';
import { classAllDeatail } from '@/types/class';
const classStore = useClassStore();

watch(
  () => classStore.selectedSemester,
  () => { getClassInfo(); }
);

const startTimes = ref([]);
const endTimes = ref([]);
const classAllDeatil = reactive<classAllDeatail>({
  list: [],
  startTime: "",
  weekNum: 0,
  startTimes: [],
  endTimes: [],
  courseNum: 0
});
const getClassInfo = async () => {
  const res = await getClassAPI(classStore.semesterInfoMap.get(classStore.selectedSemester));
  const { code, data, msg } = res.data;
  if (code != 1) {
    uni.showToast({
      title: msg,
      icon: 'none',
      duration: 1500
    });
    return;
  }
  Object.assign(classAllDeatil, data);
  console.log(classAllDeatil);
}
onMounted(async () => {
  await getClassInfo();
  startTimes.value = classAllDeatil.startTimes;
  endTimes.value = classAllDeatil.endTimes;
})
</script>

<template>
  <view class="home">
    <SelectSemesterWeek></SelectSemesterWeek>
    <view style="display: flex; ">
      <view class="class-time">
        <view class="time-box" v-for="(time, index) in startTimes" :key="index">
          <text class="time">{{ startTimes[index] }}</text>
          <text style="font-weight: 600;">{{ (index + 1) }}</text>
          <text class="time">{{ endTimes[index] }}</text>
        </view>
      </view>
      <ClassSchedule></ClassSchedule>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.home {
  width: 750rpx;
  padding: 0 5rpx;

  .class-time {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 50rpx;
    padding: 35px 5rpx 5rpx 5rpx;

    .time-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rpx;
      color: #a7a7a7;


      .time {
        font-size: 10px;
      }
    }
  }
}
</style>
