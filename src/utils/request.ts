import axios from "axios";
import { useUserStore } from "../stores/modules/userStore";

export const request = axios.create({
  baseURL: '/api',
})

export const musicRequest = axios.create({
  baseURL: 'https://api.i-meto.com/meting/api',
})


//拦截器
request.interceptors.request.use(config => {
  const token = useUserStore().jwt;
  if (token) config.headers.Authorization = `${token}`;
  return config;
}, e => Promise.reject(e))

request.interceptors.response.use(res => res.data, error => {
  if (error.response?.status === 401) {
    return Promise.reject(error);
  } else if (error.response?.status === 403) {
    return Promise.reject(error);
  }

  const errorMsg = error.response.data.msg || '请求异常，请稍后重试'
  return Promise.reject(error);
})

