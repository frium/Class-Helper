import { getClassData } from "@/types/class";
import { request } from "@/utils/request";
export const getClassAPI = (data: getClassData) => {
    return request({
        url: '/kb/option',
        method: 'POST',
        data
    })
}