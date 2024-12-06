export default function isNum(input:string){
    const isNum = /^\d+$/.test(input);
    return isNum;
}