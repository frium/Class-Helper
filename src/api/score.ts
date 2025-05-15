import { getClassData } from "@/types/class";
import { request } from "@/utils/request";
export const getScoreAPI = (getScoreData: getClassData) => {
    return request({
        url: '/grade/option',
        method: 'POST',
        data: getScoreData
    })
}