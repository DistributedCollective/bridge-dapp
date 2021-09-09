/**
 *
 * BridgePage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectBridgePage } from './selectors';
import { bridgePageSaga } from './saga';
import { Logo } from './components/Logo';

import { Asset, NetworkType } from '../../../types';

import { StartingChainCard } from './components/StartingChainCard';
import { DestinationChainCard } from './components/DestinationChainCard';
import { ConfirmationButton } from './components/ConfirmationButton';
import { useBuildBridgeState } from '../../hooks/useBridgeState';
import { TransactionDialog } from './components/TransactionDialog';
import { BridgeDictionary } from '../../../dictionaries';

interface Props {}

export function BridgePage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: bridgePageSaga });

  const bridgePage = useSelector(selectBridgePage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.init());
  }, [dispatch]);

  const { sourceNetwork, targetNetwork } = useBuildBridgeState(
    NetworkType.ETH,
    NetworkType.RSK,
    Asset.ETH,
    Asset.ETHs,
    '0.01',
  );

  useEffect(() => {
    if (bridgePage.networkType !== undefined) {
      const source = bridgePage.networkType;
      const sideNetworks = BridgeDictionary.getMainNetworks(source);
      let target = targetNetwork.value;
      if (!sideNetworks.map(item => item.network).includes(source)) {
        target = sideNetworks[0].network;
      }
      sourceNetwork.set(source);
      targetNetwork.set(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridgePage.networkType]);

  useEffect(() => {
    dispatch(actions.changeNetwork(sourceNetwork.value));
  }, [sourceNetwork.value, dispatch]);

  return (
    <>
      <main className="container my-12">
        <Logo />

        <div className="w-full flex flex-col space-y-8 xl:flex-row xl:justify-center xl:items-start xl:space-y-0 xl:space-x-16 xl:px-24 h-full">
          <StartingChainCard />
          <DestinationChainCard />
          <ConfirmationButton state={bridgePage} dispatch={dispatch} />
          <TransactionDialog />
        </div>

        <div className="mx-auto mt-11 text-xs max-w-2xl">
          Withdrawals directly to exchange addresses are not advised due to lack
          of support by exchanges (e.g. Binance), we are not responsible for any
          loss of funds in these cases. Please only send funds to wallet
          addresses that you control exclusively (EOA).
        </div>
      </main>
    </>
  );
}
