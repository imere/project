import { ILogDataNumber } from '../logger';
import {
  IPerformanceObserverCallback,
} from './index';

export const fp: ILogDataNumber = {
  value: NaN,
};

export const fcp: ILogDataNumber = {
  value: NaN,
};

export const initFirstPaint: IPerformanceObserverCallback = function initFirstPaint(entries, cb) {
  entries.forEach(entry => {
    if (entry.name === 'first-paint') {
      fp.value = entry.startTime;
    } else if (entry.name === 'first-contentful-paint') {
      fcp.value = entry.startTime;
    }
  });

  cb?.();
};
