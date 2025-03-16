export default function getDate(date:string) {
  const currentDate = new Date(date);
  const localCurrentDate = currentDate.toLocaleDateString();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  return `${localCurrentDate}, ${hours}:${minutes}:${seconds}`;
}
