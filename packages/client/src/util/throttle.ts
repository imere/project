// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<F extends (...args: any[]) => any>(fn: F, delayMs = 100): (...args: Parameters<F>) => void {
  let last = -Infinity;
  return function (this: unknown, ...args) {
    if (Date.now() - last < delayMs) return;
    last = Date.now();
    fn.apply(this, args);
  };
}
