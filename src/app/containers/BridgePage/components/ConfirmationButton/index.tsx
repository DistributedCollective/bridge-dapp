import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import cn from 'classnames';
import { bignumber } from 'mathjs';
import { NetworkType } from 'types';
import swapLogo from 'assets/swap.svg';
import { Button } from '../../../../components/Form/Button';
import { wallet } from '../../../../../services/wallet';
import { BridgePageState } from '../../types';
import { NetworkDictionary } from '../../../../../dictionaries';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { BridgeInformation } from '../DestinationChainCard/BridgeInformation';
import { actions } from '../../slice';
import { toWei } from '../../../../../utils/math';

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
  return (
    <div className="bridge-actions xl:bridge-actions-sized flex-fill h-fulltext-center order-3 xl:order-2">
      {state.address.length === 0 ? (
        <ConnectWallet loading={state.connecting} />
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
        </div>
      )}
      <BridgeInformation
        networkType={sourceNetwork.value}
        asset={asset.value}
      />
    </div>
  );
}

function ConnectWallet({ loading }: { loading: boolean }) {
  return (
    <div className="xl:pt-44 w-full flex flex-col items-center justify-center">
      <Button
        text="Connect Wallet"
        className="btn-action w-full"
        onClick={() => wallet.connect()}
        loading={loading}
        disabled={loading}
      />
      <button className="mt-4 link">Need help connecting?</button>
    </div>
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

  return (
    <div>
      <Button
        text="Transfer"
        loading={state.tx.loading}
        disabled={
          state.tx.loading ||
          bignumber(toWei(data.amount.value)).lessThan(
            data.min.nested('value').value,
          )
        }
        onClick={handleSubmit}
      />
    </div>
  );
}
