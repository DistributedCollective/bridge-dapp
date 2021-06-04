import { useSelector } from 'react-redux';
import { Asset, NetworkType } from 'types';
import { token } from 'services/interactions/token';
import { selectBridgePage } from '../containers/BridgePage/selectors';
import { useGetNetworkType } from './useGetNetworkType';
import { useNetworkCall } from './useNetworkCall';
import { useBridgeState } from './useBridgeState';

export function useBalanceOf(asset: Asset, network?: NetworkType) {
  const networkType = useGetNetworkType(network);
  const { address } = useSelector(selectBridgePage);
  const { targetNetwork } = useBridgeState();
  return useNetworkCall(
    token.balanceOf,
    'token_balanceOf',
    [networkType, targetNetwork.value, asset, address],
    '0',
    address.length === 42,
  );
}
