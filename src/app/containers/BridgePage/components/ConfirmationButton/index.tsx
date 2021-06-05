import React, { useCallback, useMemo } from 'react';
import { Dispatch } from 'redux';
import cn from 'classnames';
import { bignumber } from 'mathjs';
import { NetworkType } from 'types';
import swapLogo from 'assets/swap.svg';
import { Button } from '../../../../components/Form/Button';
import { wallet } from '../../../../../services/wallet';
import { BridgePageState } from '../../types';
import {
  AssetDictionary,
  NetworkDictionary,
} from '../../../../../dictionaries';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { BridgeInformation } from '../DestinationChainCard/BridgeInformation';
import { actions } from '../../slice';
import { fromWei, toNumberFormat, toWei } from '../../../../../utils/math';
import { useBalanceOf } from '../../../../hooks/useBalanceOf';
import { WalletButton } from '../../../../components/Form/WalletButton';
import { useAggregatorBalanceOf } from '../../../../hooks/useAggregatorBalanceOf';

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

  const sourceChainId = useMemo(
    () => NetworkDictionary.getChainId(sourceNetwork.value),
    [sourceNetwork.value],
  );

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
          {state.networkChain !== sourceChainId ? (
            <WrongNetwork sourceNetwork={sourceNetwork.value} />
          ) : (
            <FormButton state={state} dispatch={dispatch} />
          )}
        </div>
      )}
      <BridgeInformation
        networkType={sourceNetwork.value}
        sideNetworkType={targetNetwork.value}
        asset={asset.value}
      />
    </div>
  );
}

function ConnectWallet({ loading }: { loading: boolean }) {
  return (
    <div className="xl:pt-44 w-full flex flex-col items-center justify-center">
      <WalletButton
        text="Connect Wallet"
        onClick={() => wallet.connect()}
        loading={loading}
        disabled={loading}
      />
      <a
        href="https://wiki.sovryn.app/en/sovryn-dapp/ethereum-bridge"
        className="mt-4 link"
        target="_blank"
        rel="noreferrer noopener"
      >
        Need help connecting?
      </a>
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
      <a
        href="https://wiki.sovryn.app/en/sovryn-dapp/ethereum-bridge"
        className="mt-4 link"
        target="_blank"
        rel="noreferrer noopener"
      >
        Need help connecting?
      </a>
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
          targetAsset: data.targetAsset.value,
          amount: data.amount.value,
          receiver: data.receiver.value,
          sourceNetwork: data.sourceNetwork.value,
          targetNetwork: data.targetNetwork.value,
        }),
      );
    }
  }, [data, state.tx.loading, dispatch]);
  const weiBalance = useAggregatorBalanceOf(
    data.asset.value,
    data.targetAsset.value,
  );
  const { value, loading } = useBalanceOf(
    data.asset.value,
    data.sourceNetwork.value,
  );

  const balance = useMemo(
    () =>
      Number(
        fromWei(
          weiBalance.value,
          data.targetAsset.value,
          data.sourceNetwork.value,
          data.targetNetwork.value,
        ),
      ),
    [
      weiBalance.value,
      data.targetNetwork.value,
      data.sourceNetwork.value,
      data.targetAsset.value,
    ],
  );

  const amount = useMemo(() => {
    let _cost = data.fee.nested('value').value;
    if (_cost < 0 || isNaN(_cost)) _cost = 0;
    return bignumber(data.amount.value || 0)
      .minus(
        fromWei(
          _cost,
          data.asset.value,
          data.sourceNetwork.value,
          data.targetNetwork.value,
        ),
      )
      .toNumber();
  }, [
    data.fee,
    data.amount.value,
    data.asset.value,
    data.sourceNetwork.value,
    data.targetNetwork.value,
  ]);

  const lowBalance = useMemo(
    () =>
      data.sourceNetwork.value === NetworkType.RSK
        ? bignumber(amount).greaterThanOrEqualTo(balance)
        : false,
    [data.sourceNetwork.value, amount, balance],
  );

  const disabled = useMemo(() => {
    return (
      !data.fee.value ||
      !data.min.value ||
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
          data.targetNetwork.value,
        ),
      ).greaterThan(value)
    );
  }, [data, loading, value, state]);

  return (
    <div className="w-full text-center">
      <Button
        text="Transfer"
        loading={state.tx.loading}
        className="btn-trade mx-auto"
        disabled={disabled || lowBalance}
        onClick={handleSubmit}
      />

      {lowBalance && !weiBalance.loading && (
        <p className="text-red mt-3">
          There is not enough{' '}
          {AssetDictionary.getSymbol(
            data.targetNetwork.value,
            data.sourceNetwork.value,
            data.targetAsset.value,
          )}{' '}
          in the aggregator right now.
          <br />
          Available: {toNumberFormat(balance, 4)}{' '}
          {AssetDictionary.getSymbol(
            data.targetNetwork.value,
            data.sourceNetwork.value,
            data.targetAsset.value,
          )}
        </p>
      )}
    </div>
  );
}
