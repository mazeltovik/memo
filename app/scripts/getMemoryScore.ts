export default function getMemoryScore(shuffleInitialWords:string[],approvedWords:string[]){
    const totalLen = shuffleInitialWords.length;
    let correct = 0;
    approvedWords.forEach(word=>{
     if(shuffleInitialWords.includes(word)){
        correct +=1 
     }
    })
    const percentage = Math.round((correct / totalLen) * 100);
    return {correct,percentage}
}