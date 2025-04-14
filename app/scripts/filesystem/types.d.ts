type Progress = {
    start:string,
    currentDay:number,
    finish:string,
    checkDay:string,
    visitedDay: string,
}
export default Progress;

export type ChallengeData = {
    date:string,
    currentDay:string,
    correct: number;
    totalChallenge: number;
    formatedTime: string;
    evaluation: string;
    fine: number;
};

export type CountTestData = {
    date:string,
    currentDay:string,
    time:number;
    formatedTime: string;
    evaluation:string;
}

export type MemoryTestData = {
    date:string,
    currentDay:string,
    correct: number;
    totalLen: number;
    percentage: number;
}

export type ModalsData = {
    isChallengeShow:boolean,
    isCountTestShow:boolean,
    isMemoryTestShow:boolean,
    isProgressShow:boolean,
}



