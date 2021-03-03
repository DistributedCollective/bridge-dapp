import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal, { IProviderOptions } from 'web3modal';
import Web3 from 'web3';
import { rpcNodes } from './classifiers';
import { ChainId } from './types';
import { store } from '../../../store/store';
import { actions } from './slice';
import { network } from './network';
import { DEFAULT_CHAIN } from '../../../utils/helpers';
import { showError } from '../../../utils/toaster';

class WalletConnection {
  private _web3Modal: Web3Modal = null as any;
  public init(chainId: ChainId) {
    const providerOptions: IProviderOptions = {
      walletconnect: {
        display: {
          name: 'Mobile',
          description: 'Scan qrcode with your mobile wallet',
        },
        package: WalletConnectProvider,
        options: {
          chainId: DEFAULT_CHAIN,
          rpc: rpcNodes,
        },
      },
    };

    this._web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      cacheProvider: true,
      providerOptions: providerOptions,
    });

    if (this._web3Modal.cachedProvider) {
      this.connect().then().catch();
    }
  }

  public async connect() {
    try {
      this.connectProvider(await this._web3Modal.connectTo('injected'));
      return true;
    } catch (e) {
      console.error('connect fails.');
      console.error(e);
      return false;
    }
  }

  public async disconnect() {
    try {
      if (
        network.writeWeb3 &&
        network.writeWeb3.currentProvider &&
        (network.writeWeb3.currentProvider as any).close
      ) {
        await (network.writeWeb3.currentProvider as any).close();
      }
      await this._web3Modal.clearCachedProvider();
      store.dispatch(actions.disconnected());
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected async connectProvider(provider) {
    try {
      store.dispatch(actions.connect());
      await this.subscribeProvider(provider);

      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      network.setWriteWeb3(web3);

      const accounts = await network.writeWeb3.eth.getAccounts();

      const address = accounts[0];

      if (!address) {
        store.dispatch(actions.disconnect());
        return;
      }

      const chainId = await (network.writeWeb3.eth as any).chainId();
      store.dispatch(actions.chainChanged({ chainId, networkId }));
      store.dispatch(actions.connected({ address }));
    } catch (e) {
      console.error('connect provider fails.');
      console.error(e);
      await this.disconnect();
      showError(
        'Connection to wallet failed. Please try another wallet if issue persists.',
      );
    }
  }

  protected subscribeProvider(provider) {
    try {
      if (provider.on) {
        provider.on('close', () => {
          store.dispatch(actions.disconnect());
        });
        provider.on('error', error => {
          console.error('provider error', error);
        });
        provider.on('open', a => {
          console.log('provider open?', a);
        });
        provider.on('accountsChanged', async (accounts: string[]) => {
          store.dispatch(actions.accountChanged(accounts[0]));
        });
        provider.on('chainChanged', async (chainId: ChainId) => {
          const networkId = await network.writeWeb3.eth.net.getId();
          await this.updateAddress();
          store.dispatch(
            actions.chainChanged({
              chainId: Number(chainId) as ChainId,
              networkId,
            }),
          );
        });
      }
    } catch (e) {
      console.error('subscribe provider fails');
      console.error(e);
    }
  }

  protected async updateAddress() {
    const accounts = await network.writeWeb3.eth.getAccounts();
    const address = accounts[0];
    if (!address) {
      store.dispatch(actions.disconnect());
      return;
    }
    store.dispatch(actions.accountChanged(address));
  }
}

export const walletConnection = new WalletConnection();
