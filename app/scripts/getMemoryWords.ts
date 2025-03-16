import memoryWords from "@/assets/words/words";
import getRandomInt from "./getRandomInt";

export default function getMemoryWords(){
    const initialIndex = getRandomInt(0,11);
    let wrongIndex = 0;
    while(true){
        wrongIndex = getRandomInt(0,11);
        if(wrongIndex != initialIndex) break;
    }
    return [memoryWords[initialIndex],memoryWords[wrongIndex].slice(15)];
}