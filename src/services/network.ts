import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { AbiItem, toWei } from 'web3-utils';
import { NetworkType } from '../types';
import { NetworkDictionary } from '../dictionaries';
import { wallet } from './wallet';
import { toaster } from './toaster';

type Web3s = { [chainId: string]: Web3 };
type Contracts = { [contractAddress: string]: Contract };
type Web3sContracts = { [chainId: string]: Contracts };

class Network {
  private web3s: Web3s = {};
  private contracts: Web3sContracts = {};

  public async call(
    network: NetworkType,
    contractAddress: string,
    abiInterface: AbiItem[],
    methodName: string,
    args: string[],
    options: TransactionConfig = {},
  ): Promise<string> {
    const contract = await this.getContractForNetwork(
      network,
      contractAddress,
      abiInterface,
    );
    return await contract.methods[methodName](...args).call(options);
  }

  public async send(
    network: NetworkType,
    contractAddress: string,
    abiInterface: AbiItem[],
    methodName: string,
    args: string[],
    options: TransactionConfig = {},
  ) {
    if (!wallet.isConnected()) {
      toaster.error('Wallet is not connected.');
      return Promise.reject('Wallet is not connected');
    }
    const contract = await this.getContractForNetwork(
      network,
      contractAddress,
      abiInterface,
    );

    const data = await contract.methods[methodName](...args).encodeABI();

    let gasLimit = options?.gas;
    try {
      gasLimit = await contract.methods[methodName](...args).estimateGas({
        from: wallet.address,
        value: options?.value || 0,
        gas: options?.gas,
      });
    } catch (e) {}

    const { chainId } = NetworkDictionary.get(network);

    const opt = Object.assign(
      {},
      {
        from: wallet.address,
        to: contractAddress,
        chainId,
        data,
        gas: options?.gas || gasLimit,
        ...(network === NetworkType.RSK
          ? { gasPrice: toWei('0.065', 'gwei') }
          : {}),
      },
      options,
    );

    return wallet.send(opt);
  }

  public async nonce(network: NetworkType, address: string) {
    const web3 = await this.getWeb3ForNetwork(network);
    return web3.eth.getTransactionCount(address);
  }

  public async getWeb3ForNetwork(network: NetworkType): Promise<Web3> {
    const { chainId, nodeUrl } = NetworkDictionary.get(network);
    if (!this.web3s.hasOwnProperty(chainId)) {
      let web3Provider;
      if (nodeUrl.startsWith('http')) {
        web3Provider = new Web3.providers.HttpProvider(nodeUrl, {
          keepAlive: true,
        });
      } else {
        web3Provider = new Web3.providers.WebsocketProvider(nodeUrl, {
          reconnectDelay: 10,
        });
      }
      this.web3s[chainId] = new Web3(web3Provider);
    } else {
      let listening = false;

      try {
        listening = await this.web3s[chainId].eth.net.isListening();
      } catch (e) {
        console.error(
          `web3 connection for ${network} was closed, will reconnect.`,
          e,
        );
      }

      if (!listening) {
        delete this.web3s[chainId];
        delete this.contracts[chainId];
        return this.getWeb3ForNetwork(network);
      }
    }
    return this.web3s[chainId];
  }

  public async getContractForNetwork(
    network: NetworkType,
    contractAddress: string,
    abiInterface: AbiItem[],
  ) {
    const web3 = await this.getWeb3ForNetwork(network);
    const { chainId } = NetworkDictionary.get(network);
    if (
      this.web3s.hasOwnProperty(chainId) &&
      this.contracts.hasOwnProperty(chainId) &&
      this.contracts[chainId].hasOwnProperty(contractAddress)
    ) {
      return this.contracts[chainId][contractAddress];
    }
    const contract = new web3.eth.Contract(abiInterface, contractAddress);
    contract.handleRevert = true;
    if (!this.contracts.hasOwnProperty(chainId)) {
      this.contracts[chainId] = {};
    }
    this.contracts[chainId][contractAddress] = contract;
    return this.contracts[chainId][contractAddress];
  }
}

export const network = new Network();
