import { ILogDataNumber } from '../logger';
import { IPerformanceEntryExtend } from '../typings/performance';
import { IPerformanceObserverCallback } from './index';

export const cls: ILogDataNumber = {
  value: 0,
};

export const initCumulativeLayoutShift: IPerformanceObserverCallback = (entries, cb) => {
  const entry = entries.pop() as undefined | IPerformanceEntryExtend;

  if (!entry || entry.hadRecentInput || !entry.value) return;

  cls.value += entry.value;

  cb?.();
};
