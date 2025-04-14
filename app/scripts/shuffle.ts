export default function shuffle<T>(arr:T[]){
    const copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        let j = Math.random() * (i + 1) | 0;
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
}