import { getClassData } from "@/types/class";
import { request } from "@/utils/request";
export const getExaminationAPI = (data: getClassData) => {
    return request({
        url: '/exam/option',
        method: 'POST',
        data
    })
}