import { NetworkType } from '../types';
import { wallet } from '../services/wallet';
import { walletService } from '@sovryn/react-wallet';
import { ProviderType } from '@sovryn/wallet';

export function prettyTx(
  text: string,
  startLength: number = 6,
  endLength: number = 4,
) {
  const start = text.substr(0, startLength);
  const end = text.substr(-endLength);
  return `${start} ··· ${end}`;
}

export function makeId(length: number = 8): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export const handleNumber = (value, onlyPositive = true) => {
  if (value === undefined || value === null) {
    value = '';
  }

  if (value === '') {
    return value;
  }

  let number = value.replace(',', '.').replace(/[^\d.-]/g, '');

  if (onlyPositive) {
    number = number.replace('-', '');
  }

  if (onlyPositive && Number(number) < 0) {
    return Math.abs(number).toString();
  }

  if (number.length === 1 && number === '.') {
    return '0.';
  }

  if (isNaN(number) && number !== '-') {
    return '';
  }

  return number.toString();
};

export function unique(value, index, self) {
  return self.indexOf(value) === index;
}

export async function getWalletAddressForNetwork(networkType: NetworkType) {
  try {
    if (wallet?.provider?.isLiquality) {
      // Liquality wallet passes eth, bsc and rsk objects to window.
      return await window[networkType]
        .request({ method: 'eth_accounts' })
        .then(e => e[0]);
    }
  } catch (e) {
    console.error(e);
  }
  return wallet.address;
}

export function detectWeb3Wallet() {
  switch (walletService.providerType) {
    default:
    case ProviderType.WEB3:
      const { ethereum } = window as any;
      if (ethereum) {
        if (ethereum.isLiquality) return 'liquality';
        if (ethereum.isNiftyWallet) return 'nifty';
        if (ethereum.isMetaMask) return 'metamask';
        return 'unknown';
      }
      return 'none';
    case ProviderType.PORTIS:
      return 'portis';
    case ProviderType.LEDGER:
      return 'ledger';
    case ProviderType.TREZOR:
      return 'trezor';
    case ProviderType.WALLET_CONNECT:
      return 'wallet-connect';
  }
}
