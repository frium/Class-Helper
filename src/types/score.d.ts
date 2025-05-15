export interface scoreInfo {
    kcmc: string,
    xf: string,
    cj: string,
    jd: string,
    js: string,
    khfs: string,
    details: Array<scoreDetailsList>,
    xnm: string,
    xqm: string,
    kcxzmc: string
}
interface scoreDetailsList {
    name: string,
    percent: number,
    score: string
}

export interface scoreTotalDetail {
    totalScore: number,
    gpa: number,
    passNumber: number,
    failNumber: number
}