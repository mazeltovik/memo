export default function getDiffDate(start: string, now: string) {
  const startDate = new Date(start);
  const nowDate = new Date(now);
  const diffTime = Math.abs(nowDate - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
  // const lastDate = new Date(lastEntryDate);
  // const localLastDate = lastDate.toLocaleDateString();
  // const currentDate = new Date();
  // const localCurrentDate = currentDate.toLocaleDateString();
  // const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // if (!diffDays && localLastDate != localCurrentDate) {
  //     currentDay += 1;
  // }
  // if (diffDays) {
  //     currentDay += diffDays + 1;
  // }
  // return {
  //     freshEntryDate: currentDate.toString(),
  //     newCurrentDay:currentDay
  // };
}
