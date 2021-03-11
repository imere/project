import { assign } from '@packages/shared/util/object';
import { finalResult } from '../data';
import { INetworkInfo } from '../global';
import { INavigatorInfo } from '../helper/device';
import { scheduler } from '../scheduler';

export interface ILogDataNumber {
  value: number
}

export interface ILogDataTime {
  start: number
  duration?: number
}

export type TLogDataNetwork = Partial<INetworkInfo>

export type TLogDataDevice = Partial<INavigatorInfo>


export interface ILogger {
  log(namespace: string, data: unknown, $props?: unknown): void
}

export const log: ILogger['log'] = function log(namespace, data, $props): void {
  scheduler.push(() => {
    assign(finalResult, namespace, data);
  });
};

