import { request } from "@/utils/request";
import { LoginData } from "@/types/auth";
export const loginAPI = (loginData: LoginData) => {
    return request({
        url: '/auth/token',
        method: 'POST',
        data: loginData
    })
}
export const getUserInfoAPI = () => {
    return request({
        url: '/user/personal',
    })
}