import { bignumber } from 'mathjs';
import { Asset, NetworkType } from '../types';
import { AssetDictionary } from '../dictionaries';
import { wallet } from '../services/wallet';

export function toNumberFormat(amount: number, decimals: number = 2) {
  return Number(amount).toLocaleString(navigator.language, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const weiTo = (amount: any, decimals: number = 0): string => {
  return roundToSmaller(bignumber(fromWei(amount)), decimals);
};

export const roundToSmaller = (amount: any, decimals: number): string => {
  const bn = bignumber(amount);
  let [integer, decimal] = bn.toFixed(128).split('.');

  if (decimal && decimal.length) {
    decimal = decimal.substr(0, decimals);
  } else {
    decimal = '0'.repeat(decimals);
  }

  if (decimal.length < decimals) {
    decimal = decimal + '0'.repeat(decimals - decimal.length);
  }

  if (decimal !== '') {
    return `${integer}.${decimal}`;
  }
  return `${integer}`;
};

export const fromWei = (
  amount: any,
  asset?: Asset,
  network?: NetworkType,
  sideNetwork?: NetworkType,
) => {
  let decimals = 0;

  if (asset === undefined) {
    decimals = 18;
  } else {
    const _decimals = AssetDictionary.getDecimals(
      network || wallet.networkType,
      sideNetwork || wallet.networkType,
      asset,
    );

    if (_decimals !== undefined) {
      decimals = _decimals;
    } else {
      decimals = 18;
    }
  }

  return roundToSmaller(bignumber(amount || '0').div(10 ** decimals), decimals);
};

export const toWei = (
  amount: any,
  asset?: Asset,
  network?: NetworkType,
  sideNetwork?: NetworkType,
) => {
  let decimals = 0;

  if (asset === undefined) {
    decimals = 18;
  } else {
    const _decimals = AssetDictionary.getDecimals(
      network || wallet.networkType,
      sideNetwork || wallet.networkType,
      asset,
    );

    if (_decimals !== undefined) {
      decimals = _decimals;
    } else {
      decimals = 18;
    }
  }

  return roundToSmaller(bignumber(amount || '0').mul(10 ** decimals), 0);
};
