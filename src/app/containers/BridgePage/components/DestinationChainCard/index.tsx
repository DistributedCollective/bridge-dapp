import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bignumber } from 'mathjs';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { FormGroup } from '../../../../components/Form/FormGroup';
import RadioGroup from '../../../../components/Form/RadioGroup';
import { AssetDictionary } from '../../../../../dictionaries';
import { Card } from '../../../../components/Form/Card';
import { NetworkType } from '../../../../../types';
import { fromWei, toNumberFormat } from '../../../../../utils/math';
import { Input } from '../../../../components/Form/Input';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { selectBridgePage } from '../../selectors';
import { BridgeDictionary } from 'dictionaries';
import { AssetSelect } from '../../../../components/Form/AssetSelect';
import { getWalletAddressForNetwork } from '../../../../../utils/helpers';
import { wallet } from '../../../../../services/wallet';

export function DestinationChainCard() {
  const {
    sourceNetwork,
    targetNetwork,
    amount,
    receiver,
    fee,
    asset,
    targetAsset,
  } = useBridgeState();
  const { address, networkType } = useSelector(selectBridgePage);

  const [cost, setCost] = useState(0);
  const [value, setValue] = useState(Number(amount.value));
  const [receiveAtExternalWallet, setReceiveAtExternalWallet] = useState(false);

  const networkList = useMemo(() => {
    return BridgeDictionary.getSideNetworks(sourceNetwork.value);
  }, [sourceNetwork.value]);

  const assetList = useMemo(() => {
    const currentAsset = AssetDictionary.get(
      sourceNetwork.value,
      targetNetwork.value,
      asset.value,
    );
    const bridge = BridgeDictionary.get(
      targetNetwork.value,
      sourceNetwork.value,
    );
    if (bridge === undefined || currentAsset === undefined) {
      return [];
    }
    return bridge.assets
      .map(item => item.asset)
      .filter(item =>
        currentAsset.aggregatorData.aggregatedTokens.includes(item),
      );
  }, [sourceNetwork.value, targetNetwork.value, asset.value]);

  useEffect(() => {
    if (assetList.length && !assetList.includes(targetAsset.value)) {
      targetAsset.set(assetList[0]);
    }
  }, [assetList, targetAsset]);

  const changeTargetNetwork = useCallback(
    (value: string) => {
      const target = value as NetworkType;
      const sideNetworks = BridgeDictionary.getMainNetworks(target);
      let source = targetNetwork.value;

      if (!sideNetworks.map(item => item.network).includes(target)) {
        source = sideNetworks[0].network;
      }

      sourceNetwork.set(source);
      targetNetwork.set(target);
      receiver.set('');
      setReceiveAtExternalWallet(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sourceNetwork, targetNetwork],
  );

  useEffect(() => {
    let _cost = fee.nested('value').value;
    if (_cost < 0 || isNaN(_cost)) _cost = 0;
    const _value = bignumber(amount.value || 0)
      .minus(
        fromWei(_cost, asset.value, sourceNetwork.value, targetNetwork.value),
      )
      .toNumber();
    setCost(_cost);
    setValue(_value < 0 ? 0 : _value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fee.nested('value').value,
    amount.value,
    asset.value,
    sourceNetwork.value,
    targetNetwork.value,
  ]);

  // Tries to resolve user wallet address for receiving end and fills in it if it's different
  // than current connected wallet address. Mostly for Liquality Wallet support.
  useEffect(() => {
    const run = async () => {
      if (!!wallet.address) {
        return await getWalletAddressForNetwork(
          targetNetwork.value,
        ).then(address =>
          wallet.address.toLowerCase() !== address.toLowerCase()
            ? address.toLowerCase()
            : '',
        );
      }
      return '';
    };

    run().then(value => receiver.set(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceNetwork.value, targetNetwork.value, wallet.address]);

  return (
    <div className="bridge-card xl:bridge-card-m-400 order-2 xl:order-3">
      <Card>
        <h1>Destination chain</h1>
        <div
          className={cn({
            'opacity-25': !address || networkType !== sourceNetwork.value,
          })}
        >
          <FormGroup>
            <RadioGroup
              value={targetNetwork.value}
              onChange={changeTargetNetwork}
            >
              {networkList.map(item => (
                <RadioGroup.Button
                  key={item.network}
                  value={item.network}
                  text={
                    <>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="mr-1 w-6 h-6 object-fit"
                      />{' '}
                      <div className="truncate uppercase">{item.name}</div>
                    </>
                  }
                />
              ))}
            </RadioGroup>
          </FormGroup>
          {assetList.length > 1 && (
            <FormGroup label="Receive Asset:">
              <AssetSelect
                value={targetAsset.value}
                onChange={value => targetAsset.set(value)}
                placeholder="Select Asset"
                options={assetList}
                networkType={targetNetwork.value}
                sideNetworkType={sourceNetwork.value}
              />
            </FormGroup>
          )}

          <FormGroup
            label="Receive Amount:"
            describe={
              <>
                Total Cost:{' '}
                {toNumberFormat(
                  Number(
                    fromWei(
                      cost,
                      asset.value,
                      sourceNetwork.value,
                      targetNetwork.value,
                    ),
                  ),
                  AssetDictionary.getDecimals(
                    targetNetwork.value,
                    sourceNetwork.value,
                    targetAsset.value,
                  ),
                )}
              </>
            }
          >
            <Input
              value={toNumberFormat(
                value,
                AssetDictionary.getDecimals(
                  targetNetwork.value,
                  sourceNetwork.value,
                  targetAsset.value,
                ),
              )}
              readOnly
              appendElem={
                <>
                  {AssetDictionary.getSymbol(
                    targetNetwork.value,
                    sourceNetwork.value,
                    targetAsset.value,
                  )}
                </>
              }
            />
          </FormGroup>
          <FormGroup label="Receiving Address:">
            {!receiveAtExternalWallet && (
              <>
                <div className="font-light">
                  {receiver?.value === ''
                    ? address
                    : receiver.value.toLowerCase()}
                </div>
              </>
            )}
            {receiveAtExternalWallet && (
              <Input
                className="mb-1"
                value={receiver.value}
                onChange={value => receiver.set((value || '').toLowerCase())}
                placeholder="Enter or paste an address"
              />
            )}
            <button
              className="text-secondary font-medium hover:underline focus:outline-none"
              onClick={() => {
                setReceiveAtExternalWallet(!receiveAtExternalWallet);
                receiver.set('');
              }}
            >
              {receiveAtExternalWallet
                ? '- Click here to receive at the current address'
                : '+ Click here to receive at an external address'}
            </button>
          </FormGroup>
        </div>
      </Card>
    </div>
  );
}
