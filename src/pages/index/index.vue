<script setup lang="ts">
import SelectSemesterWeek from './components/SelectSemesterWeek.vue';
import ClassSchedule from './components/ClassSchedule.vue';
import { getClassAPI } from '@/api/class';
import { useClassStore } from '@/stores/modules/classStore';
import { onMounted, reactive, ref, watch } from 'vue';
import { classAllDeatail, classInfo } from '@/types/class';
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
const generateWeeklyDateGroups = (startDate: string, weeks: number): string[][] => {
  const result: string[][] = [];
  const date = new Date(startDate);

  for (let week = 0; week < weeks; week++) {
    const currentWeek: string[] = [];
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() + week * 7 + day);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
      currentWeek.push(`${month}/${dayOfMonth}`);
    }
    result.push(currentWeek);
  }
  return result;
};
const classInfoArr = ref<classInfo[][][]>();
const separateArr = () => {
  classInfoArr.value = Array.from({ length: classAllDeatil.weekNum }, () =>
    Array.from({ length: 7 }, () =>
      Array(5).fill(null)
    )
  );
  for (let i = 0; i < classAllDeatil.list.length; i++) {
    //获取课程信息
    const classInfo: classInfo = classAllDeatil.list[i];
    //获取周
    const allWeek: string[] = classInfo.zcd.split(',');
    for (let j = 0; j < allWeek.length; j++) {
      const week: string[] = allWeek[j].split('周')[0].split("-");
      let weekStart: number;
      let weekEnd: number;
      if (week.length == 1) {
        weekStart = parseInt(week[0]);
        weekEnd = parseInt(week[0]);
      } else {
        weekStart = parseInt(week[0]);
        weekEnd = parseInt(week[1]);
      }
      let jumpNum = 1;
      if (allWeek[j].includes('单') || allWeek[j].includes('双')) jumpNum = 2;
      //获取星期
      const day: number = parseInt(classInfo.xqj);
      //获取第几节课程
      const classTime: number = (parseInt(classInfo.jc.split("-")[0]) + 1) / 2;
      //填充数据
      for (let i = weekStart - 1; i <= weekEnd - 1; i += jumpNum) {
        classInfoArr.value[i][day - 1][classTime - 1] = classInfo;
      }
    }
  }
}

const dataArr = ref([]);
onMounted(async () => {
  await getClassInfo();
  startTimes.value = classAllDeatil.startTimes;
  endTimes.value = classAllDeatil.endTimes;
  dataArr.value = generateWeeklyDateGroups(classAllDeatil.startTime, classAllDeatil.weekNum);
  separateArr();
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
      <swiper class="swiper" :duration="500">
        <swiper-item v-for="(item, index) in dataArr" :key="index">
          <ClassSchedule :dateInfo="dataArr[index]" :classData="classInfoArr[index]"></ClassSchedule>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.swiper {
  height: 88vh;
  width: 750rpx;
}

.home {
  width: 750rpx;
  padding: 0 5rpx;

  .class-time {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 55rpx;
    padding: 35px 12rpx 10rpx 8rpx;

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
