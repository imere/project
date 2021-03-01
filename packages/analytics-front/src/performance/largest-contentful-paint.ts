import { IPerformanceObserverCallback } from '.';
import { ILogDataNumber } from '../logger';
import { IPerformanceEntryExtend } from '../typings/performance';

export const lcp: ILogDataNumber = {
  value: NaN,
};

export const initLargestContentfulPaint: IPerformanceObserverCallback = function initLargestContentfulPaint(entries, cb) {
  const entry = entries.pop() as undefined | IPerformanceEntryExtend;

  if (!entry) return;

  lcp.value = entry.renderTime || entry.loadTime;

  cb?.();
};
