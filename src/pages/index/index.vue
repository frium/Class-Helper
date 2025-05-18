<script setup lang="ts">
import SelectSemesterWeek from './components/SelectSemesterWeek.vue';
import ClassSchedule from './components/ClassSchedule.vue';
import { getClassAPI } from '@/api/class';
import { useClassStore } from '@/stores/modules/classStore';
import { reactive, ref, watch } from 'vue';
import { classAllDeatail, classInfo } from '@/types/class';
import PopupClassInfo from './components/PopupClassInfo.vue'
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app';
import Loading from '@/components/Loading.vue'

const classStore = useClassStore();
const show = ref(false);

watch(
  () => classStore.selectedSemester,
  () => { getClassInfo(); }
);
const classAllDeatil = reactive<classAllDeatail>({
  list: [],
  startTime: "",
  weekNum: 0,
  startTimes: [],
  endTimes: [],
  courseNum: 0
});
const getClassInfo = async () => {
  loading.value = true;
  const localData = classStore.getLocalClassAllDetail(classStore.selectedSemester);
  if (!localData) {
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
  }
  Object.assign(classAllDeatil, localData);
  classStore.setLocalClassAllDetail(classStore.selectedSemester, classAllDeatil);
  dataArr.value = generateWeeklyDateGroups(classAllDeatil.startTime, classAllDeatil.weekNum);
  setTimeout(() => {
    separateArr();
    loading.value = false;
    toNowWeek();

  }, 0);

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
const classInfoArr = ref<classInfo[][][][]>();
const separateArr = () => {
  classInfoArr.value = Array.from({ length: classAllDeatil.weekNum }, () => Array.from({ length: 7 }, () => Array.from({ length: classAllDeatil.startTimes.length / 2 }, () => [])));
  classStore.miniWeek = Array.from({ length: classAllDeatil.weekNum }, () => Array.from({ length: 7 }, () => Array.from({ length: classAllDeatil.startTimes.length / 2 })));
  for (let i = 0; i < classAllDeatil.list.length; i++) {
    //获取课程信息
    const classInfo: classInfo = classAllDeatil.list[i];
    setColorMap(classInfo);
    //获取周
    const allWeek: string[] = classInfo.zcd.split(',');
    let notWeek: number = 1;
    for (let j = 0; j < allWeek.length; j++) {
      const week: string[] = allWeek[j].split('周')[0].split("-");
      let weekStart: number;
      let weekEnd: number;
      weekStart = parseInt(week[0]);
      weekEnd = week.length == 1 ? weekStart : parseInt(week[1]);
      let toJump: boolean = false;
      if (allWeek[j].includes('单') || allWeek[j].includes('双')) toJump = true;
      //获取星期
      const day: number = parseInt(classInfo.xqj);
      //获取第几节课程
      const classTime: number = (parseInt(classInfo.jc.split("-")[0]) + 1) / 2;
      //获取课程持续时间
      const lastTime: number = (parseInt(classInfo.jc.split("-")[1].split('节')[0]) - parseInt(classInfo.jc.split("-")[0]) + 1) / 2;
      //填充数据
      for (let i = notWeek - 1; i <= weekEnd - 1; i++) {
        const nowClassInfo: classInfo = {
          kch_id: "",
          kcmc: "",
          xslxbj: "",
          cdmc: "",
          jc: "",
          xqj: "",
          zcd: "",
          xm: "",
          xf: "",
          khfsmc: "",
          isNextWeek: false,
          isNowWeek: false,
          lastTime: lastTime
        };
        Object.assign(nowClassInfo, classInfo);
        if (i >= weekStart - 1) { //填充当前周课程
          if (!toJump) {
            nowClassInfo.isNowWeek = true;
            classStore.miniWeek[i][day - 1][classTime - 1] = true;
          }
          if (toJump && (weekStart % 2 == 0 && (i + 1) % 2 == 0) || (weekStart % 2 != 0 && (i + 1) % 2 != 0)) {
            nowClassInfo.isNowWeek = true;
            classStore.miniWeek[i][day - 1][classTime - 1] = true;
          }
        } else { //填充非当前周课程
          nowClassInfo.isNowWeek = false;
          if (i + 1 >= weekStart - 1) nowClassInfo.isNextWeek = true;  //是否是下一周的课程
        }
        classInfoArr.value[i][day - 1][classTime - 1].push(nowClassInfo);
        classInfoArr.value[i][day - 1][classTime - 1].sort((a, b) => Number(b.isNowWeek) - Number(a.isNowWeek));
        //如果持续时间大于等于两节课
        if (lastTime >= 2) {
          for (let z = 0; z < lastTime - 1; z++) {
            classInfoArr.value[i][day - 1][classTime + z].push(null);
          }
        }

      }
      notWeek = weekEnd + 1;
    }
  }
  index = 0;

}
let index = 0;
const setColorMap = (classInfo: classInfo) => {
  if (!classStore.classColorMap.get(classInfo.kcmc)) {
    classStore.classColorMap.set(classInfo.kcmc, classStore.colorArr[index++]);
  }
}
const dataArr = ref([]);

const handleSwiperChange = (event: any) => {
  classStore.selectedWeek = event.detail.current + 1;
}
const loading = ref(true);
const showClassInfoArr = ref([]);
const handelShowClassInfo = (classInfoArr: Array<classInfo>) => {
  show.value = true;
  showClassInfoArr.value = classInfoArr;
}
const toNowWeek = () => {
  const nowDate = new Date();
  const startDate = new Date(classAllDeatil.startTime);
  const weekIndex = Math.floor((nowDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1;
  if (weekIndex <= 22) {
    classStore.nowWeek = weekIndex;
    classStore.selectedWeek = weekIndex;
  }
}

onShow(async () => {
  await getClassInfo();
})

onPullDownRefresh(async () => {
  await getClassInfo();
})
</script>

<template>
  <Loading :loading="loading"></Loading>
  <view v-if="!loading" class="home">
    <SelectSemesterWeek @to-now-week="toNowWeek"></SelectSemesterWeek>
    <view>
      <view style="display: flex; ">
        <view class="class-time">
          <view class="time-box" v-for="(time, index) in classAllDeatil.startTimes" :key="index">
            <text class="time">{{ classAllDeatil.startTimes[index] }}</text>
            <text style="font-weight: 600;">{{ (index + 1) }}</text>
            <text class="time">{{ classAllDeatil.endTimes[index] }}</text>
          </view>
        </view>
        <swiper class="swiper" :duration="200" @change="handleSwiperChange" :current="(classStore.selectedWeek - 1)">
          <swiper-item v-for="(item, index) in dataArr" :key="index">
            <ClassSchedule v-if="classInfoArr && classInfoArr[index]" :dateInfo="dataArr[index]"
              :classData="classInfoArr[index]" @select-class="handelShowClassInfo"></ClassSchedule>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
  <up-popup v-model:show="show" bgColor="transparent" mode="center" :style="{ position: 'fixed', zIndex: 9999 }">
    <view class="popup-out-box">
      <template v-for="(item, index) in showClassInfoArr" :key="index">
        <PopupClassInfo v-if="item" :classInfo="item"></PopupClassInfo>
      </template>
    </view>
  </up-popup>
</template>
<style lang="scss" scoped>
.popup-out-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: auto;
  max-width: calc(300rpx * 2 + 15px);
}



.swiper {
  height: 90vh;
  width: 750rpx;
}

.home {
  position: relative;
  width: 750rpx;
  padding: 0 5rpx;

  .class-time {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 55rpx;
    padding: 60rpx 12rpx 30rpx 8rpx;

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
