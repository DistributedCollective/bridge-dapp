import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NetworkType } from 'types';
import { selectBridgePage } from '../containers/BridgePage/selectors';

export function useGetNetworkType(network?: NetworkType) {
  const { networkType } = useSelector(selectBridgePage);

  const [net, setNetwork] = useState(network || networkType);

  useEffect(() => {
    setNetwork(network || networkType);
  }, [network, networkType]);

  return net;
}
