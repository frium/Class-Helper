
export interface getClassData {
    xnm: string;
    xqm: string;
}

export interface classInfo {
    kch_id: string,
    kcmc: string,
    xslxbj: string,
    cdmc: string,
    jc: string,
    xqj: string,
    zcd: string,
    xm: string,
    xf: string,
    khfsmc: string,
    isNowWeek?: boolean,
    isNextWeek?: boolean,
    lastTime?: number
}

export interface classAllDeatail {
    list: classInfo[],
    startTime: string,
    weekNum: number,
    startTimes: string[],
    endTimes: string[],
    courseNum: number
}