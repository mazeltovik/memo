export default function getRandomInt(min:number, max:number) {
    // Math.floor(Math.random() * (max - min + 1)) + min
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function getRandomEvenInt(range:number){
    const operand1 = 8 + Math.floor( Math.random() * range / 2 ) * 2;
    const possibleOperands = [];
    for(let i = 2;i < 10; i++){
        if(operand1 % i == 0){
            possibleOperands.push(i);
        }
    }
    const index = getRandomInt(0,possibleOperands.length -1);
    return [operand1,possibleOperands[index]];
}