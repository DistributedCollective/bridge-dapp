import React, { useMemo } from 'react';
import cn from 'classnames';
import { FormGroup } from '../../../../components/Form/FormGroup';
import RadioGroup from '../../../../components/Form/RadioGroup';
import { NetworkType } from '../../../../../types';
import { AssetSelect } from '../../../../components/Form/AssetSelect';
import {
  AssetDictionary,
  NetworkDictionary,
} from '../../../../../dictionaries';
import { Card } from '../../../../components/Form/Card';
import { AmountInput } from '../../../../components/Form/AmountInput';
import { useBalanceOf } from '../../../../hooks/useBalanceOf';
import { toNumberFormat, fromWei } from 'utils/math';
import { Spinner } from '@blueprintjs/core';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { useSelector } from 'react-redux';
import { selectBridgePage } from '../../selectors';
import { useWalletContext } from '@sovryn/react-wallet';

const networks = NetworkDictionary.list();

export function StartingChainCard() {
  const { sourceNetwork, targetNetwork, asset, amount } = useBridgeState();
  const { networkType } = useSelector(selectBridgePage);

  // Filters only assets that are available in both source and target networks.
  const assetList = useMemo(() => {
    const targetChain = NetworkDictionary.getChainId(targetNetwork.value);
    if (targetChain === undefined) {
      return [];
    }
    return AssetDictionary.list(sourceNetwork.value)
      .filter(item => Array.from(item.contracts.keys()).includes(targetChain))
      .map(item => item.asset);
  }, [sourceNetwork.value, targetNetwork.value]);

  const { value } = useBalanceOf(asset.get(), sourceNetwork.get());

  const { loading: connecting, address } = useWalletContext();

  return (
    <div className="bridge-card xl:bridge-card-m-400 order-1">
      <Card>
        <h1>Starting Chain</h1>
        <FormGroup
          className={cn({
            'opacity-25 pointer-events-none': !address,
          })}
        >
          <RadioGroup
            className="radio-group--secondary"
            value={sourceNetwork.get()}
            onChange={value =>
              sourceNetwork.set((value as unknown) as NetworkType)
            }
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
            'opacity-25 pointer-events-none':
              !address || networkType !== sourceNetwork.value,
          })}
        >
          <FormGroup
            label="Send Asset:"
            describe={
              <div className="flex flex-row items-center justify-start">
                Available balance:{' '}
                {toNumberFormat(
                  Number(fromWei(value, asset.value, sourceNetwork.value)),
                  4,
                )}{' '}
                {connecting && (
                  <Spinner size={12} className="inline-block ml-1" />
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
            />
          </FormGroup>
          <FormGroup label="Amount:">
            <AmountInput
              value={amount.get()}
              onChange={value => amount.set(value)}
              asset={asset.get()}
              networkType={sourceNetwork.get()}
            />
          </FormGroup>
        </div>
      </Card>
    </div>
  );
}
