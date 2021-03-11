import { ILogDataNumber } from '../logger';
import { IPerformanceObserverCallback } from './index';
import { fcp } from './paint';

export const tbt: ILogDataNumber = {
  value: 0,
};

export const initTotalBlockingTime: IPerformanceObserverCallback = function initTotalBlockingTime(entries, cb) {
  let start = Infinity, duration = 0;

  entries.forEach(entry => {
    if (/* is render */entry.name === 'self' || entry.startTime < fcp.value) return;

    start = Math.min(entry.startTime, start);

    duration += entry.duration > 50 ? entry.duration - 50 : 0;
  });

  tbt.value += duration;

  cb?.();
};
