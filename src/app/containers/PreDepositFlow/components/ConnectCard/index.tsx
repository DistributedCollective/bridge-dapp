import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Card } from '../../../../components/Card';
import { Button } from '../../../../components/Button';
import { actions } from '../../slice';
import { selectBlockChainProvider } from '../../../BlockChainProvider/selectors';
import { LoaderCard } from '../LoaderCard';
import { walletConnection } from '../../../BlockChainProvider/web3-modal';
import { DEFAULT_CHAIN } from '../../../../../utils/helpers';

interface Props {
  dispatch: Dispatch;
}

export function ConnectCard({ dispatch }: Props) {
  const { connected, connecting, address, chainId } = useSelector(
    selectBlockChainProvider,
  );

  const handleWalletConnection = useCallback(() => {
    walletConnection
      .connect()
      .then(() => {})
      .catch(console.error);
  }, []);

  const handleGenerateAddressClick = useCallback(() => {
    dispatch(actions.generateDepositAddress(address));
  }, [dispatch, address]);

  if (connecting) return <LoaderCard />;

  return (
    <Card theme="dark">
      <div className="w-full flex flex-col items-center justify-center">
        {connected && address && DEFAULT_CHAIN !== chainId ? (
          <h2 className="text-teal">Wrong Network!</h2>
        ) : (
          <h2>Generate you pre-order deposit address</h2>
        )}
        <div className="flex flex-col justify-center items-center h-48 mb-12">
          {!connected && !address && (
            <Button
              text="Connect to your RSK Wallet"
              type="button"
              onClick={handleWalletConnection}
            />
          )}
          {connected && address && (
            <>
              {DEFAULT_CHAIN === chainId ? (
                <>
                  <Button
                    text="Generate deposit address"
                    type="button"
                    onClick={handleGenerateAddressClick}
                  />
                  <p className="w-56 text-center mt-5 text-small">
                    Make sure you are using correct RSK wallet - you will not be
                    able to change it.
                  </p>
                </>
              ) : (
                <>
                  <p className="lead text-center">
                    Please switch to{' '}
                    {chainId === 30 ? 'RSK testnet' : 'RSK mainnet'} and make
                    sure you selected correct RSK wallet to receive your SOV.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
