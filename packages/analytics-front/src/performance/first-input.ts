import { ILogDataTime } from '../logger';
import { IPerformanceEntryExtend } from '../typings/performance';
import {
  IPerformanceObserverCallback,
} from './index';

export const fidVital: ILogDataTime = {
  start: NaN,
};

export const fid: ILogDataTime = {
  start: NaN,
};

export const initFirstInputDelay: IPerformanceObserverCallback = function initFirstInputDelay(entries, cb) {
  const entry = entries.pop() as undefined | IPerformanceEntryExtend;

  if (entry) {
    // core
    fidVital.start = entry.startTime;
    fidVital.duration = entry.processingStart - entry.startTime;
    // classic
    fid.start = entry.startTime;
    fid.duration = entry.duration;
  }

  cb?.();
};
