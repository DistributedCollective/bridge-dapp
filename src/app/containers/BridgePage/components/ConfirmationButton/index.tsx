import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import cn from 'classnames';
import { useWalletContext } from '@sovryn/react-wallet';
import { WalletProvider } from '@sovryn/react-wallet';
import { bignumber } from 'mathjs';
import { NetworkType } from 'types';
import swapLogo from 'assets/swap.svg';
import { Button } from '../../../../components/Form/Button';
import { BridgePageState } from '../../types';
import { NetworkDictionary } from '../../../../../dictionaries';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { BridgeInformation } from '../DestinationChainCard/BridgeInformation';
import { actions } from '../../slice';
import { fromWei, toWei } from '../../../../../utils/math';
import { useBalanceOf } from '../../../../hooks/useBalanceOf';
import { WalletButton } from '../../../../components/Form/WalletButton';

interface Props {
  state: BridgePageState;
  dispatch: Dispatch;
}

export function ConfirmationButton({ state, dispatch }: Props) {
  const { sourceNetwork, targetNetwork, asset } = useBridgeState();
  const swapNetworks = () => {
    const source = sourceNetwork.value;
    const target = targetNetwork.value;
    sourceNetwork.set(target);
    targetNetwork.set(source);
  };
  const { address } = useWalletContext();

  return (
    <div className="bridge-actions xl:bridge-actions-sized flex-fill h-fulltext-center order-3 xl:order-2">
      <WalletProvider remember>
        {address.length === 0 ? (
          <ConnectWallet />
        ) : (
          <div className="xl:pt-12 w-full flex flex-col items-center justify-center">
            <img
              src={swapLogo}
              alt="Swap Icon"
              className={cn(
                'w-48 h-48 xl:w-full xl:h-full object-fit transition duration-300 cursor-pointer',
                {
                  'opacity-25': state.networkType !== sourceNetwork.value,
                },
              )}
              onClick={() => swapNetworks()}
            />
            {state.networkType !== sourceNetwork.value ? (
              <WrongNetwork sourceNetwork={sourceNetwork.value} />
            ) : (
              <FormButton state={state} dispatch={dispatch} />
            )}
            <ConnectWallet />
          </div>
        )}
      </WalletProvider>
      <BridgeInformation
        networkType={sourceNetwork.value}
        asset={asset.value}
      />
    </div>
  );
}

function ConnectWallet() {
  const {
    connected,
    loading: connecting,
    address,
    connect,
    disconnect,
  } = useWalletContext();
  return (
    <>
      {!connected && !address ? (
        <div className="xl:pt-44 w-full flex flex-col items-center justify-center">
          <WalletButton
            text="Connect Wallet"
            onClick={() => connect()}
            loading={connecting}
            disabled={connecting}
          />
        </div>
      ) : (
        <div className="xl:pt-5 w-full flex flex-col items-center justify-center">
          <WalletButton
            text="Switch Wallet"
            onClick={() => disconnect()}
            loading={connecting}
            disabled={connecting}
          />
        </div>
      )}
    </>
  );
}

function WrongNetwork({ sourceNetwork }: { sourceNetwork: NetworkType }) {
  const network = NetworkDictionary.get(sourceNetwork);
  return (
    <>
      <p className="mb-3 font-semibold text-center text-lg">Wrong Network!</p>
      <p className="text-center">
        Please select the <strong>{network.name}</strong> network in your
        browser wallet
      </p>
      <button className="mt-4 link">Need help connecting?</button>
    </>
  );
}

function FormButton({
  state,
  dispatch,
}: {
  state: BridgePageState;
  dispatch: Dispatch;
}) {
  const data = useBridgeState();

  const handleSubmit = useCallback(() => {
    if (!state.tx.loading) {
      dispatch(
        actions.submitTransfer({
          asset: data.asset.value,
          amount: data.amount.value,
          receiver: data.receiver.value,
          sourceNetwork: data.sourceNetwork.value,
          targetNetwork: data.targetNetwork.value,
        }),
      );
    }
  }, [data, state.tx.loading, dispatch]);

  const { value, loading } = useBalanceOf(
    data.asset.value,
    data.sourceNetwork.value,
  );

  return (
    <div className="w-full text-center">
      <Button
        text="Transfer"
        loading={state.tx.loading}
        className="btn-trade mx-auto"
        disabled={
          (loading && !value) ||
          state.tx.loading ||
          bignumber(data.amount.value || '0').lessThan(
            fromWei(data.min.nested('value').value),
          ) ||
          bignumber(
            toWei(
              data.amount.value,
              data.asset.value,
              data.sourceNetwork.value,
            ),
          ).greaterThan(value)
        }
        onClick={handleSubmit}
      />
    </div>
  );
}
