export type Init = {
    lastEntryDate: string,
    currentDay:number,
}

export type ChallengeSavingData = {
    currentDay:number,
    correct: number;
    totalChallenge: number;
    formatedTime: string;
    evaluation: string;
    fine: number;
};

export type CountTestSavingData = {
    currentDay:number,
    time:number;
    formatedTime: string;
    evaluation:string;
}

export type MemoryTestSavingData = {
    currentDay:number,
    correct: number;
    totalLen: number
    percentage: number;
}



