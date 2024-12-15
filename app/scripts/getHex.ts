export default function getHex() {
    const rgb = [];
    for (let i = 0; i < 3; i++) {
      const hex = randomInt(26, 255).toString(16);
      rgb.push(hex);
    }
    return `#${rgb.join('')}`;
}
  
  function randomInt(min: number, max: number) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}