export function getRandomNumber(minNumber: number, maxNumber: number): number {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
