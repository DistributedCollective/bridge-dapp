import MetamaskLogo from 'assets/wallets/metamask.svg';
import NiftyLogo from 'assets/wallets/nifty.png';
import LiqualityLogo from 'assets/wallets/liquality.svg';
import PortisLogo from 'assets/wallets/portis.svg';
import LedgerLogo from 'assets/wallets/ledger.svg';
import TrezorLogo from 'assets/wallets/trezor.svg';
import WalletConnectLogo from 'assets/wallets/walletconnect.svg';

export const getWalletName = walletName => {
  switch (walletName) {
    default:
      return 'MetaMask';
    case 'liquality':
      return 'Liquality';
    case 'nifty':
      return 'Nifty';
    case 'portis':
      return 'Portis';
    case 'ledger':
      return 'Ledger';
    case 'trezor':
      return 'Trezor';
    case 'wallet-connect':
      return 'Wallet Connect';
  }
};

export const getWalletImage = walletName => {
  switch (walletName) {
    default:
      return MetamaskLogo;
    case 'liquality':
      return LiqualityLogo;
    case 'nifty':
      return NiftyLogo;
    case 'portis':
      return PortisLogo;
    case 'ledger':
      return LedgerLogo;
    case 'trezor':
      return TrezorLogo;
    case 'wallet-connect':
      return WalletConnectLogo;
  }
};
