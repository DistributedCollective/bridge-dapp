import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { NetworkDictionary } from 'dictionaries';
import { NetworkChainId, NetworkType } from 'types';
import { toaster } from '../toaster';
import { toHex } from 'web3-utils';

type EventNames =
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'addressChanged'
  | 'chainChanged';

class Wallet {
  private _address: string = '';
  private _chainId: NetworkChainId =
    NetworkDictionary.getChainId(NetworkType.ETH) || NetworkChainId.ETH_TESTNET;
  private _networkType: NetworkType = NetworkType.ETH;

  private _triggers: { [key: string]: Array<any> } = {};

  private _web3: Web3 = new Web3((window as any).ethereum);

  private _provider = (window as any).ethereum || false;

  constructor() {
    this.watchForChanges();
  }

  public async connect() {
    this.trigger('connecting', true);
    if (this.provider) {
      this._web3 = new Web3(this.provider);
      const addresses = await this.provider
        .send('eth_requestAccounts')
        .then(response =>
          Array.isArray(response) ? response : response?.result || [],
        )
        .catch(err => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
            this.trigger('disconnected', 'Connection rejected by user.');
            toaster.error('Connection rejected by user.');
          } else {
            console.error(err);
            toaster.error(err.message);
            this.trigger('disconnected', err.toString());
          }
        });

      if (addresses && addresses.length) {
        this._address = addresses[0].toLowerCase();
        this.trigger('connected', this.address);
        this.trigger('addressChanged', this.address);

        const chainId = await this.provider
          .send('eth_chainId')
          .then(response => Number(response.result || response));

        if (this.chainId !== chainId) {
          this._chainId = chainId;
          this.trigger('chainChanged', this.chainId);
        }

        this.trigger('connecting', false);
        return addresses;
      }
    }
    this.trigger('connecting', false);
    return false;
  }

  public isConnected() {
    if (this.provider) {
      if (this.provider.hasOwnProperty('isConnected')) {
        return this.provider.isConnected() && !!this.address;
      }
      return !!this.address;
    }
    return false;
  }

  public on = (event: EventNames, callback: (address: string) => void) => {
    if (!this._triggers[event]) {
      this._triggers[event] = [];
    }
    this._triggers[event].push(callback);
  };

  public off = (event: EventNames, callback?) => {
    if (this._triggers.hasOwnProperty(event)) {
      if (!callback) {
        this._triggers[event] = [];
      } else {
        this._triggers[event] = this._triggers[event].filter(
          item => item !== callback,
        );
      }
    }
  };

  public send(config: TransactionConfig): Promise<string> {
    const options = Object.assign({}, { from: this.address }, config);
    return new Promise((resolve, reject) => {
      this.web3.eth
        .sendTransaction(options)
        .once('transactionHash', value => resolve(value))
        .once('error', error => {
          reject(error);
          toaster.error(error.message);
        });
    });
  }

  public sign(message: string) {}

  public get address() {
    return this._address;
  }

  public get networkType() {
    return this._networkType;
  }

  public get chainId() {
    return this._chainId;
  }

  public get web3() {
    return this._web3;
  }

  public get provider() {
    return this._provider;
  }

  public async changeChain(networkType: NetworkType) {
    const chain = NetworkDictionary.get(networkType);
    if (!chain) return Promise.resolve(null);
    return this._provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: toHex(chain.chainId),
          chainName: chain.longName,
          nativeCurrency: {
            name: chain.coinName,
            symbol: chain.coinName,
            decimals: chain.coinDecimals,
          },
          rpcUrls: [chain.nodeUrl],
          blockExplorerUrls: [chain.explorer],
        },
      ],
    });
  }

  private trigger(event: EventNames, ...values: any) {
    if (this._triggers[event]) {
      for (let i in this._triggers[event]) {
        if (this._triggers[event].hasOwnProperty(i)) {
          this._triggers[event][i](...values);
        }
      }
    }
  }

  private watchForChanges() {
    if (this.provider) {
      this.provider.on('connect', data =>
        this.trigger('chainChanged', Number(data.chainId)),
      );

      this.provider.on('disconnect', value => {
        this.trigger('addressChanged', '');
        this.trigger('disconnected');
      });

      this.provider.on('accountsChanged', value =>
        this.trigger('addressChanged', (value[0] || '').toLowerCase()),
      );

      this.provider.on('chainChanged', value =>
        this.trigger('chainChanged', Number(value)),
      );
    }
  }
}

export const wallet = new Wallet();
export type { Wallet };
