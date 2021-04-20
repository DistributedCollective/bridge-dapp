import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bignumber } from 'mathjs';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { FormGroup } from '../../../../components/Form/FormGroup';
import RadioGroup from '../../../../components/Form/RadioGroup';
import { AssetDictionary } from '../../../../../dictionaries';
import { Card } from '../../../../components/Form/Card';
import { NetworkType } from '../../../../../types';
import { toNumberFormat } from '../../../../../utils/math';
import { Input } from '../../../../components/Form/Input';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { selectBridgePage } from '../../selectors';
import { BridgeDictionary } from 'dictionaries';

export function DestinationChainCard() {
  const {
    sourceNetwork,
    targetNetwork,
    amount,
    receiver,
    fee,
    asset,
  } = useBridgeState();
  const { address, networkType } = useSelector(selectBridgePage);

  const [cost, setCost] = useState(0);
  const [value, setValue] = useState(Number(amount.value));
  const [receiveAtExternalWallet, setReceiveAtExternalWallet] = useState(false);

  const networkList = useMemo(() => {
    return BridgeDictionary.getSideNetworks(sourceNetwork.value);
  }, [sourceNetwork.value]);

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
    },
    [sourceNetwork, targetNetwork],
  );

  useEffect(() => {
    let _cost = bignumber(amount.value || 0)
      .mul((fee.nested('value').value || 0) / 100)
      .toNumber();
    if (_cost < 0 || isNaN(_cost)) _cost = 0;
    const _value = bignumber(amount.value || 0)
      .minus(_cost)
      .toNumber();
    setCost(_cost);
    setValue(_value < 0 ? 0 : _value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fee.nested('value').value, amount.value]);

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
          {!receiveAtExternalWallet ? (
            <div className="mb-12">
              <button
                className="text-secondary hover:underline font-medium"
                onClick={() => setReceiveAtExternalWallet(true)}
              >
                + Receive at external address
              </button>
            </div>
          ) : (
            <FormGroup label="Enter Receiving Address:">
              <Input
                value={receiver.value}
                onChange={value => receiver.set(value)}
                placeholder="Enter or paste address"
              />
            </FormGroup>
          )}
          <FormGroup
            label="Receive Asset:"
            describe={
              <>
                Total Cost:{' '}
                {toNumberFormat(
                  cost,
                  AssetDictionary.getDecimals(
                    targetNetwork.value,
                    sourceNetwork.value,
                    asset.value,
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
                  asset.value,
                ),
              )}
              readOnly
              appendElem={
                <>
                  {AssetDictionary.getSymbol(
                    targetNetwork.value,
                    sourceNetwork.value,
                    asset.value,
                  )}
                </>
              }
            />
          </FormGroup>
        </div>
      </Card>
    </div>
  );
}
