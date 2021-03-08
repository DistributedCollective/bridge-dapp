import { bignumber } from 'mathjs';
import { Unit } from 'web3-utils';

export function toNumberFormat(amount: number, decimals: number = 2) {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const weiTo = (amount: any, decimals: number = 0): string => {
  return roundToSmaller(bignumber(fromWei(amount, 'ether')), decimals);
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

export const fromWei = (amount: any, unit: Unit = 'ether') => {
  let decimals = 0;
  switch (unit) {
    case 'ether':
      decimals = 18;
      break;
    default:
      throw new Error('Unsupported unit (custom fromWei helper)');
  }

  return roundToSmaller(bignumber(amount || '0').div(10 ** decimals), decimals);
};

export const toWei = (amount: any, unit: Unit = 'ether') => {
  let decimals = 0;
  switch (unit) {
    case 'ether':
      decimals = 18;
      break;
    default:
      throw new Error('Unsupported unit (custom fromWei helper)');
  }

  return roundToSmaller(bignumber(amount || '0').mul(10 ** decimals), 0);
};
