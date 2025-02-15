export default function getMemoryScore(shuffleInitialWords:string[],approvedWords:string[]){
    const totalLen = shuffleInitialWords.length;
    let correct = 0;
    let wrong = 0;
    approvedWords.forEach(word=>{
     shuffleInitialWords.includes(word)? correct +=1 : wrong+=1;
    })
    const percentage = Math.round(((correct -  wrong) / totalLen) * 100);
    const fine = Math.round(100 - percentage);
    return {correct,percentage,fine}
}