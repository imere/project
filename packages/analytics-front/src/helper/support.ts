import { Perf, W } from '../global';

export function isPerformanceSupported(): boolean {
  return (
    Perf &&
    'getEntriesByType' in Perf &&
    'now' in Perf &&
    'mark' in Perf
  );
}

export function isPerformanceObserverSupported(): boolean {
  return 'PerformanceObserver' in W;
}
