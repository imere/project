export const percentBase = 24;

export function calcPercent(val: number): number {
  return val * 100 / percentBase;
}
