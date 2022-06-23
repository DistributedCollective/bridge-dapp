import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { NetworkType } from '../types';
import { NetworkDictionary } from '../dictionaries';
import { wallet } from './wallet';
import { toaster } from './toaster';
import { debug } from '../utils/debug';

const { error, log } = debug('network');

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
    log(`call ${network} ${contractAddress} ${methodName}`, args, options);
    const contract = await this.getContractForNetwork(
      network,
      contractAddress,
      abiInterface,
    );
    return await contract.methods[methodName](...args)
      .call(options)
      .then(result => {
        log(
          `call result ${network} ${contractAddress} ${methodName}`,
          result,
          args,
          options,
        );
        return result;
      });
  }

  public async send(
    network: NetworkType,
    contractAddress: string,
    abiInterface: AbiItem[],
    methodName: string,
    args: string[],
    options: TransactionConfig = {},
  ) {
    log(`send ${network} ${contractAddress} ${methodName}`, args, options);
    if (!wallet.isConnected()) {
      error('user was was not connected.');
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
      },
      options,
    );

    return wallet.send(opt).then(tx => {
      log(
        `send result ${network} ${contractAddress} ${methodName}`,
        tx,
        args,
        options,
      );
      return tx;
    });
  }

  public async nonce(network: NetworkType, address: string) {
    log(`nonce ${network} ${address}`);
    const web3 = await this.getWeb3ForNetwork(network);
    return web3.eth.getTransactionCount(address);
  }

  public async receipt(network: NetworkType, transactionHash: string) {
    log(`receipt ${network} ${transactionHash}`);
    const web3 = await this.getWeb3ForNetwork(network);
    return web3.eth.getTransactionReceipt(transactionHash);
  }

  public async blockNumber(network: NetworkType) {
    log(`blockNumber ${network}`);
    const web3 = await this.getWeb3ForNetwork(network);
    return web3.eth.getBlockNumber();
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
        error(`web3 connection for ${network} was closed, will reconnect.`, e);
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
