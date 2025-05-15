import axios from "axios";
import { useUserStore } from "../stores/modules/userStore";
import { AxiosResponse } from 'axios';
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import { ApiResponse } from "@/types/common";

export const request = axios.create({
  baseURL: 'https://jwplus.longfish.site/api',
  adapter: createUniAppAxiosAdapter(),
  timeout: 15000
})

//拦截器
request.interceptors.request.use(config => {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  const token = useUserStore().token;
  if (!config.url.includes('/auth/token') && !token) {
    uni.showModal({
      title: '提示',
      content: '用户未登录！',
      showCancel: false,
      confirmText: '去登录',
      success(res) {
        if (res.confirm) {
          uni.switchTab({
            url: '/pages/personalCenter/index'
          });
        }
      }
    })
    return;
  }
  if (token) config.headers.Authorization = `${token}`;
  return config;
}, e => Promise.reject(e))

request.interceptors.response.use((res: AxiosResponse<ApiResponse>) => {
  if (res.data.code === 0 && res.data.msg === '未认证') {
    useUserStore().token = "";
    uni.showModal({
      title: '提示',
      content: '用户未登录！',
      showCancel: false,
      confirmText: '去登录',
      success(res) {
        if (res.confirm) {
          uni.switchTab({
            url: '/pages/personalCenter/index'
          });
        }
      }
    });

    return Promise.reject(res.data);
  }

  return res;
}, error => {
  if (error.response?.status === 401) {
    uni.showToast({
      title: "用户未登录!",
      icon: 'none',
      duration: 1500
    });
    uni.redirectTo({
      url: '/pages/index/index'
    });
    return Promise.reject(error);
  } else if (error.response?.status === 403) {
    return Promise.reject(error);
  }

  const errorMsg = error?.response?.data?.msg || '请求异常，请稍后重试'
  console.log(errorMsg);
  return Promise.reject(error);
})

