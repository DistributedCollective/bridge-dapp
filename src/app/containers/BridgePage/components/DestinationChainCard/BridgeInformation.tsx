import React from 'react';
import { Spinner } from '@blueprintjs/core';
import { Asset, NetworkType } from '../../../../../types';
import { fromWei, toNumberFormat } from '../../../../../utils/math';
import { AssetDictionary } from '../../../../../dictionaries';
import { useBridgeState } from '../../../../hooks/useBridgeState';

interface Props {
  networkType: NetworkType;
  asset: Asset;
}

export function BridgeInformation({ networkType, asset }: Props) {
  const symbol = AssetDictionary.getSymbol(networkType, asset) || 'Token';
  const { min, max, fee, daily } = useBridgeState();
  return (
    <div className="mt-16 w-full opacity-50">
      <div className="w-2/3 lg:w-full mx-auto lg:mx-0">
        <div className="flex flex-row w-full space-x-4 mb-2">
          <div className="w-1/2">Min Transfer:</div>
          <div className="w-1/2 flex flex-row items-center justify-start">
            {toNumberFormat(
              Number(fromWei(min.nested('value').get(), asset, networkType)),
              4,
            )}{' '}
            {symbol}{' '}
            {min.nested('loading').get() && (
              <Spinner size={12} className="ml-1" />
            )}
          </div>
        </div>
        <div className="flex flex-row w-full space-x-4 mb-2">
          <div className="w-1/2">Max Transfer:</div>
          <div className="w-1/2 flex flex-row items-center justify-start">
            {toNumberFormat(Number(fromWei(max.nested('value').get())), 4)}{' '}
            {symbol}{' '}
            {max.nested('loading').get() && (
              <Spinner size={12} className="ml-1" />
            )}
          </div>
        </div>
        <div className="flex flex-row w-full space-x-4 mb-2">
          <div className="w-1/2">Bridge Fee:</div>
          <div className="w-1/2 flex flex-row items-center justify-start">
            {toNumberFormat(fee.nested('value').get(), 4)} %{' '}
            {fee.nested('loading').get() && (
              <Spinner size={12} className="ml-1" />
            )}
          </div>
        </div>
        <div className="flex flex-row w-full space-x-4 mb-2">
          <div className="w-1/2">Daily Limit:</div>
          <div className="w-1/2 flex flex-row items-center justify-start">
            {toNumberFormat(Number(fromWei(daily.nested('value').get())), 4)}{' '}
            {symbol}{' '}
            {daily.nested('loading').get() && (
              <Spinner size={12} className="ml-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
