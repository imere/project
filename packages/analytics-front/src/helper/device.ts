import { Nav } from '../global';
import {
  getNetworkInformation,
  networkInfo,
} from '../network';

export function getDeviceMemory(): number {
  return Nav.deviceMemory ?? 0;
}

export function getDeviceConcurrency(): number {
  return Nav.hardwareConcurrency ?? 0;
}

export function isLowEndDevice(): boolean {
  const [dm, dc] = [getDeviceMemory(), getDeviceConcurrency()];
  return (
    dm > 0 && dm <= 4 ||
    dc > 0 && dc <= 4
  );
}

export function isLowEndExperience(effectiveType: string, saveData: boolean): boolean {
  switch (effectiveType) {
  case 'slow-2g':
  case '2g':
  case '3g':
    return true;
  default:
    return isLowEndDevice() || saveData;
  }
}

export interface INavigatorInfo {
  deviceMemory: number
  hardwareConcurrency: number
  serviceWorkerStatus: 'controlled' | 'supported' | 'unsupported'
  isLowEndDevice: boolean
  isLowEndExperience: boolean
}

export function getNavigatorInfo(): INavigatorInfo {
  if (!Nav) return {} as INavigatorInfo;

  getNetworkInformation();

  return {
    deviceMemory: getDeviceMemory(),
    hardwareConcurrency: getDeviceConcurrency(),
    serviceWorkerStatus:
      'serviceWorker' in Nav
        ? Nav.serviceWorker.controller
          ? 'controlled'
          : 'supported'
        : 'unsupported',
    isLowEndDevice: isLowEndDevice(),
    isLowEndExperience: isLowEndExperience(networkInfo.effectiveType as string, networkInfo.saveData as boolean),
  };
}
