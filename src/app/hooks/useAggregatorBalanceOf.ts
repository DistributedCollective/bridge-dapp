import { Asset } from 'types';
import { token } from 'services/interactions/token';
import { useNetworkCall } from './useNetworkCall';
import { useBridgeState } from './useBridgeState';

export function useAggregatorBalanceOf(sourceAsset: Asset, targetAsset: Asset) {
  const { targetNetwork, sourceNetwork } = useBridgeState();
  return useNetworkCall(
    token.balanceOfBridgeToken,
    'token_balanceOfBridge',
    [sourceNetwork.value, targetNetwork.value, sourceAsset, targetAsset],
    '0',
  );
}
