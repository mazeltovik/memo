export type Init = {
    lastEntryDate: string,
    currentDay:number,
}

export type ChallengeSavingData = {
    currentDay:string,
    correct: number;
    totalChallenge: number;
    formatedTime: string;
    evaluation: string;
    fine: number;
};

export type CountTestSavingData = {
    currentDay:string,
    time:number;
    formatedTime: string;
    evaluation:string;
}

export type MemoryTestSavingData = {
    currentDay:string,
    correct: number;
    totalLen: number;
    percentage: number;
}



