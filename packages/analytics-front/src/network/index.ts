import { Nav } from '../global';
import { TLogDataNetwork } from '../logger';

export const networkInfo: TLogDataNetwork = {};

export function getNetworkInformation(): TLogDataNetwork {
  const { connection } = Nav;
  if (typeof connection !== 'object') return {};

  return Object.assign(networkInfo, {
    downlink: connection.downlink,
    effectiveType: connection.effectiveType,
    rtt: connection.rtt,
    saveData: Boolean(connection.saveData),
  } as TLogDataNetwork);
}
