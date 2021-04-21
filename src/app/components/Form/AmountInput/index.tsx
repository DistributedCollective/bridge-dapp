import React from 'react';
import { bignumber } from 'mathjs';
import { Asset, NetworkType } from 'types';
import { useBalanceOf } from 'app/hooks/useBalanceOf';
import { AssetDictionary } from 'dictionaries';
import { fromWei } from 'utils/math';
import { Input } from '../Input';

interface Props {
  value: string;
  onChange: (value: string) => void;
  asset?: Asset;
  placeholder?: string;
  networkType: NetworkType;
  sideNetworkType: NetworkType;
}

export function AmountInput({
  value,
  onChange,
  asset,
  placeholder,
  networkType,
  sideNetworkType,
  ...props
}: Props) {
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        type="number"
        placeholder={placeholder || '0.0000'}
        appendElem={
          asset !== undefined
            ? AssetDictionary.getSymbol(networkType, sideNetworkType, asset)
            : null
        }
        {...props}
      />
      {asset !== undefined && (
        <AmountSelector
          asset={asset}
          onChange={onChange}
          network={networkType}
        />
      )}
    </>
  );
}

const amounts = [10, 25, 50, 75, 100];

interface AmountSelectorProps {
  asset: Asset;
  network: NetworkType;
  onChange: (value: string) => void;
}

function AmountSelector(props: AmountSelectorProps) {
  const { value: balance } = useBalanceOf(props.asset, props.network);
  const handleChange = (percent: number) => {
    let value = '0';
    if (percent === 100) {
      value = balance;
    } else if (percent === 0) {
      value = '0';
    } else {
      value = bignumber(balance)
        .mul(percent / 100)
        .toString();
    }
    props.onChange(fromWei(value, props.asset, props.network));
  };
  return (
    <div className="mt-4 flex flex-row items-center justify-between border border-secondary rounded-lg divide-x divide-secondary">
      {amounts.map(value => (
        <AmountSelectorButton
          key={value}
          text={`${value}%`}
          onClick={() => handleChange(value)}
        />
      ))}
    </div>
  );
}

interface AmountButtonProps {
  text?: string;
  onClick?: () => void;
}

function AmountSelectorButton(props: AmountButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="text-secondary bg-secondary bg-opacity-0 font-medium text-sm leading-none px-2 py-2 text-center w-full transition hover:bg-opacity-25"
    >
      {props.text}
    </button>
  );
}
