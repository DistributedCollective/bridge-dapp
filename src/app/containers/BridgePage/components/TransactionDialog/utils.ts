import MetamaskLogo from 'assets/wallets/metamask.svg';
import NiftyLogo from 'assets/wallets/nifty.png';
import LiqualityLogo from 'assets/wallets/liquality.svg';
import PortisLogo from 'assets/wallets/portis.svg';
import LedgerLogo from 'assets/wallets/ledger.svg';
import TrezorLogo from 'assets/wallets/trezor.svg';
import WalletConnectLogo from 'assets/wallets/walletconnect.svg';

export const getWalletName = walletName => {
  if (walletName === 'liquality') return 'Liquality';
  if (walletName === 'nifty') return 'Nifty';
  if (walletName === 'portis') return 'Portis';
  if (walletName === 'ledger') return 'Ledger';
  if (walletName === 'trezor') return 'Trezor';
  if (walletName === 'wallet-connect') return 'Wallet Connect';
  return 'MetaMask';
};

export const getWalletImage = walletName => {
  if (walletName === 'liquality') return LiqualityLogo;
  if (walletName === 'nifty') return NiftyLogo;
  if (walletName === 'portis') return PortisLogo;
  if (walletName === 'ledger') return LedgerLogo;
  if (walletName === 'trezor') return TrezorLogo;
  if (walletName === 'wallet-connect') return WalletConnectLogo;
  return MetamaskLogo;
};
