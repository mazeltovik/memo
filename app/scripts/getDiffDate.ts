export default function getDiffDate(start: string, now: string) {
  const startDate = new Date(start);
  const nowDate = new Date(now);
  const diffTime = Math.abs(nowDate - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
