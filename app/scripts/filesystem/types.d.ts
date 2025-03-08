export type Init = {
    lastEntryDate: string,
    currentDay:number,
}

export type ChallengeSavingData = {
    date:string,
    currentDay:string,
    correct: number;
    totalChallenge: number;
    formatedTime: string;
    evaluation: string;
    fine: number;
};

export type CountTestSavingData = {
    date:string,
    currentDay:string,
    time:number;
    formatedTime: string;
    evaluation:string;
}

export type MemoryTestSavingData = {
    date:string,
    currentDay:string,
    correct: number;
    totalLen: number;
    percentage: number;
}



