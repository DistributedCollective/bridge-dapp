import React, { useEffect, useMemo, useState } from 'react';
import { bignumber } from 'mathjs';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { FormGroup } from '../../../../components/Form/FormGroup';
import RadioGroup from '../../../../components/Form/RadioGroup';
import {
  AssetDictionary,
  NetworkDictionary,
} from '../../../../../dictionaries';
import { Card } from '../../../../components/Form/Card';
import { NetworkType } from '../../../../../types';
import { toNumberFormat } from '../../../../../utils/math';
import { Input } from '../../../../components/Form/Input';
import { useBridgeState } from '../../../../hooks/useBridgeState';
import { selectBridgePage } from '../../selectors';
import { useWalletContext } from '@sovryn/react-wallet';

const networks = NetworkDictionary.list();

export function DestinationChainCard() {
  const {
    sourceNetwork,
    targetNetwork,
    amount,
    receiver,
    fee,
    asset,
  } = useBridgeState();
  const { networkType } = useSelector(selectBridgePage);

  const [cost, setCost] = useState(0);
  const [value, setValue] = useState(Number(amount.value));
  const [receiveAtExternalWallet, setReceiveAtExternalWallet] = useState(false);

  const networkList = useMemo(() => {
    return networks.filter(item => item.network !== sourceNetwork.value);
  }, [sourceNetwork.value]);

  const { address } = useWalletContext();

  useEffect(() => {
    if (!networkList.map(item => item.network).includes(targetNetwork.value)) {
      targetNetwork.set(networkList[0].network);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkList, targetNetwork.value]);

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
            'opacity-25 pointer-events-none':
              !address || networkType !== sourceNetwork.value,
          })}
        >
          <FormGroup>
            <RadioGroup
              value={targetNetwork.value}
              onChange={value =>
                targetNetwork.set((value as unknown) as NetworkType)
              }
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
                  AssetDictionary.getDecimals(targetNetwork.value, asset.value),
                )}
              </>
            }
          >
            <Input
              value={toNumberFormat(
                value,
                AssetDictionary.getDecimals(targetNetwork.value, asset.value),
              )}
              readOnly
              appendElem={
                <>
                  {AssetDictionary.getSymbol(targetNetwork.value, asset.value)}
                </>
              }
            />
          </FormGroup>
        </div>
      </Card>
    </div>
  );
}
