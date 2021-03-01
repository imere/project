import { pick } from '@packages/shared/util/object';
import { IPerformanceEntryExtend } from '../typings/performance';
import { IPerformanceObserverCallback } from './index';

export const et: Record<string, unknown> = Object.create(null);

export const initElementTiming: IPerformanceObserverCallback = (entries, cb) => {
  (entries as IPerformanceEntryExtend[]).forEach((entry) => {
    if (entry.identifier) {
      et[entry.identifier] = pick(entry, ['startTime', 'renderTime', 'loadTime']);
    }
  });

  cb?.();
};
