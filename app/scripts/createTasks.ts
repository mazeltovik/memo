import getRandomInt, { getRandomEvenInt } from './getRandomInt';
import shuffle from './shuffle';

type Operation = {
  operand1: number;
  operand2: number;
  operation:string;
};



export default function createTasks() {
    const tasks: Operation[] = [];
    fillTasks(tasks,'+', 15, 2, 4, 9, 9);
    fillTasks(tasks,'-', 15, 9, 8, 18, 2);
    fillTasks(tasks, '*', 15, 2, 4, 9, 9);
    fillTasks(tasks, '/',5, 0, 0, 0, 0, true);
    return shuffle(tasks);
}

function fillTasks(
  tasks: Operation[],
  operation:string,
  limit: number,
  min1: number,
  min2: number,
  max1: number,
  max2: number,
  dividedOperation?: boolean
) {
  let totalLen = 0;
  while (totalLen < limit) {
    let operand1 = 0;
    let operand2 = 0;
    if (dividedOperation) {
      const [dividedOperand1, dividedOperand2] = getRandomEvenInt(10);
      [operand1, operand2] = [dividedOperand1, dividedOperand2];
    } else {
      operand1 = getRandomInt(min1, max1);
      operand2 = getRandomInt(min2, max2);
    }
    const isOperationExist = tasks.find((operation) => {
      let { operand1: operationOperand1, operand2: operationOperand2 } =
        operation;
      return (
        (operationOperand1 == operand1 && operationOperand2 == operand2) ||
        (operationOperand1 == operand2 && operationOperand2 == operand1)
      );
    });
    if (isOperationExist) continue;
    tasks.push({ operand1, operand2, operation });
    totalLen += 1;
  }
}
