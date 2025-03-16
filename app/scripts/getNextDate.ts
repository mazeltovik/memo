export default function getNextDate(date: string, next: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + next);
  return newDate.toString();
}
