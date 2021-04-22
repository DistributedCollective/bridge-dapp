import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { FormGroup } from '../../../../components/Form/FormGroup';
import RadioGroup from '../../../../components/Form/RadioGroup';
import { AppMode, NetworkType } from '../../../../../types';
import { AssetSelect } from '../../../../components/Form/AssetSelect';
import { Card } from '../../../../components/Form/Card';
import { AmountInput } from '../../../../components/Form/AmountInput';
import { useBalanceOf } from '../../../../hooks/useBalanceOf';
import { toNumberFormat, fromWei } from 'utils/math';
import { Spinner } from '@blueprintjs/core';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { useSelector } from 'react-redux';
import { selectBridgePage } from '../../selectors';
import { BridgeDictionary } from '../../../../../dictionaries';
import { APP_MODE } from '../../../../../utils/network-utils';

const networks = BridgeDictionary.listNetworks();

export function StartingChainCard() {
  const { sourceNetwork, targetNetwork, asset, amount } = useBridgeState();
  const { address, networkType } = useSelector(selectBridgePage);

  const assetList = useMemo(() => {
    const bridge = BridgeDictionary.get(
      sourceNetwork.value,
      targetNetwork.value,
    );
    if (bridge === undefined) {
      return [];
    }
    return bridge.assets.map(item => item.asset);
  }, [sourceNetwork.value, targetNetwork.value]);

  const { value, loading } = useBalanceOf(asset.get(), sourceNetwork.get());

  const changeSourceNetwork = useCallback(
    (value: string) => {
      const source = value as NetworkType;
      const sideNetworks = BridgeDictionary.getSideNetworks(source);
      let target = targetNetwork.value;

      if (!sideNetworks.map(item => item.network).includes(source)) {
        target = sideNetworks[0].network;
      }

      sourceNetwork.set(source);
      targetNetwork.set(target);
    },
    [sourceNetwork, targetNetwork],
  );

  return (
    <div className="bridge-card xl:bridge-card-m-400 order-1">
      <Card>
        <h1>Starting Chain</h1>
        <FormGroup
          className={cn({
            'opacity-25': !address,
          })}
        >
          <RadioGroup
            className="radio-group--secondary"
            value={sourceNetwork.get()}
            onChange={changeSourceNetwork}
          >
            {networks.map(item => (
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
        <div
          className={cn({
            'opacity-25': !address || networkType !== sourceNetwork.value,
          })}
        >
          <FormGroup
            label="Send Asset:"
            describe={
              <div className="flex flex-row items-center justify-between">
                <div>
                  Available balance:{' '}
                  {toNumberFormat(
                    Number(fromWei(value, asset.value, sourceNetwork.value)),
                    4,
                  )}{' '}
                  {loading && (
                    <Spinner size={12} className="inline-block ml-1" />
                  )}
                </div>
                {APP_MODE === AppMode.TESTNET && (
                  <a
                    className="ml-3"
                    href="https://faucet.sovryn.app"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Faucet
                  </a>
                )}
              </div>
            }
          >
            <AssetSelect
              value={asset.get()}
              onChange={value => asset.set(value)}
              placeholder="Select Asset"
              options={assetList}
              networkType={sourceNetwork.get()}
              sideNetworkType={targetNetwork.get()}
            />
          </FormGroup>
          <FormGroup label="Amount:">
            <AmountInput
              value={amount.get()}
              onChange={value => amount.set(value)}
              asset={asset.get()}
              networkType={sourceNetwork.get()}
              sideNetworkType={targetNetwork.get()}
            />
          </FormGroup>
        </div>
      </Card>
    </div>
  );
}
