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

  const token = useMemo(
    () =>
      AssetDictionary.get(
        data.sourceNetwork.value,
        data.targetNetwork.value,
        data.asset.value,
      ),
    [data.sourceNetwork.value, data.targetNetwork.value, data.asset.value],
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

  const errorType = useMemo(() => {
    const weiAmount = toWei(
      data.amount.value || '0',
      data.asset.value,
      data.sourceNetwork.value,
      data.targetNetwork.value,
    );

    if (bignumber(weiAmount).greaterThan(value || '0')) return 'user-balance';

    if (
      data.sourceNetwork.value === NetworkType.RSK &&
      token?.aggregatorData.aggregatorContractAddress &&
      !token?.aggregatorData.isMinting &&
      bignumber(data.amount.value || '0').greaterThanOrEqualTo(balance || '0')
    )
      return 'aggregator-balance';

    if (
      bignumber(data.amount.value || '0').lessThan(
        fromWei(data.min.nested('value').value || '0'),
      )
    )
      return 'min-limit';

    if (
      bignumber(data.amount.value || '0').greaterThan(
        fromWei(data.max.nested('value').value || '0'),
      )
    )
      return 'max-limit';

    return false;
  }, [data, value, balance, token]);

  const disabled = useMemo(() => {
    return (
      !data.fee.value ||
      !data.min.value ||
      (loading && !value) ||
      state.tx.loading ||
      errorType !== false
    );
  }, [data, loading, value, state, errorType]);

  return (
    <div className="w-full text-center">
      <Button
        text="Transfer"
        loading={state.tx.loading}
        className="btn-trade mx-auto"
        disabled={disabled}
        onClick={handleSubmit}
      />

      {errorType === 'aggregator-balance' && !weiBalance.loading && (
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

      {errorType === 'user-balance' && !loading && (
        <p className="text-red mt-3">
          You don't have enough{' '}
          {AssetDictionary.getSymbol(
            data.sourceNetwork.value,
            data.targetNetwork.value,
            data.asset.value,
          )}{' '}
          in your wallet balance.
        </p>
      )}

      {errorType === 'min-limit' && !loading && (
        <p className="text-red mt-3">
          Minimum amount to be transferred is{' '}
          {toNumberFormat(
            Number(
              fromWei(
                data.min.nested('value').value,
                data.asset.value,
                data.targetNetwork.value,
                data.sourceNetwork.value,
              ),
            ),
            5,
          )}{' '}
          {AssetDictionary.getSymbol(
            data.sourceNetwork.value,
            data.targetNetwork.value,
            data.asset.value,
          )}{' '}
          .
        </p>
      )}

      {errorType === 'max-limit' && !loading && (
        <p className="text-red mt-3">
          Maximum amount to be transferred is{' '}
          {toNumberFormat(
            Number(
              fromWei(
                data.max.nested('value').value,
                data.asset.value,
                data.targetNetwork.value,
                data.sourceNetwork.value,
              ),
            ),
            5,
          )}{' '}
          {AssetDictionary.getSymbol(
            data.sourceNetwork.value,
            data.targetNetwork.value,
            data.asset.value,
          )}{' '}
          .
        </p>
      )}
    </div>
  );
}
