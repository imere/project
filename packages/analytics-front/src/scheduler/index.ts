import { W }from '../global';

export enum TaskPriority {
  IDLE = 'I',
  URGENT = 'URG',
}

export const PrioritySettingsMap = new Map([
  [TaskPriority.URGENT, { timeout: 10 }],
]);

export interface IScheduler {
  push<F extends (...args: unknown[]) => unknown>(task: F, priority?: TaskPriority): void
}

export const scheduler: IScheduler = {
  push(task, priority = TaskPriority.IDLE) {
    W.requestIdleCallback(task, PrioritySettingsMap.get(priority));
  },
};
