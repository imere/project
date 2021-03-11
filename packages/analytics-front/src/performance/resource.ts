import { IPerformanceObserverCallback } from '.';
import {
  IPerformanceEntryExtend,
  TPerformanceEntryInitiatorType,
} from '../typings/performance';

export const rt: Partial<Record<TPerformanceEntryInitiatorType, number>> = {};

export const initResourceSize: IPerformanceObserverCallback = (entries, cb) => {
  (entries as IPerformanceEntryExtend[]).forEach((entry) => {
    if (!entry.decodedBodySize || !entry.initiatorType) return;
    const bodySize = entry.decodedBodySize;

    let val = rt[entry.initiatorType];

    if (!val) val = rt[entry.initiatorType] = 0;

    rt[entry.initiatorType] = val += bodySize;
  });

  cb?.();
};
