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
  if (token) config.headers.Authorization = `${token}`;
  return config;
}, e => Promise.reject(e))

request.interceptors.response.use((res: AxiosResponse<ApiResponse>) => res, error => {
  if (error.response?.status === 401) {
    return Promise.reject(error);
  } else if (error.response?.status === 403) {
    return Promise.reject(error);
  }

  const errorMsg = error?.response?.data?.msg || '请求异常，请稍后重试'
  console.log(errorMsg);
  return Promise.reject(error);
})

