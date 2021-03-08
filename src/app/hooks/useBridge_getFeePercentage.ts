import { NetworkType } from 'types';
import { useGetNetworkType } from './useGetNetworkType';
import { bridge } from '../../services/interactions/bridge';
import { useNetworkCall } from './useNetworkCall';

export function useBridge_getFeePercentage(network?: NetworkType) {
  const networkType = useGetNetworkType(network);
  return useNetworkCall(
    bridge.getFeePercentage.bind(bridge),
    [networkType],
    0,
    networkType !== undefined,
  );
}
