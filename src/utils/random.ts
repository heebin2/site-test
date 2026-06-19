/** [min, max) 범위의 실수 난수 */
export const rand = (min: number, max: number) =>
  min + Math.random() * (max - min)

/** 배열에서 무작위 원소 하나를 고른다 */
export const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]
