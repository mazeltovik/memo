export default function shuffle(arr:string[]){
    const copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
}