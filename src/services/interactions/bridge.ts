import { AbiItem } from 'web3-utils';
import { TransactionConfig } from 'web3-core';
import { NetworkType } from 'types';
import { network } from 'services';
import { NetworkDictionary } from 'dictionaries';
import bridgeAbi from 'assets/abi/BridgeAbi.json';
import allowTokensAbi from 'assets/abi/AllowTokensAbi.json';

class Bridge {
  private _bridgeAllowTokensContractMap: Map<NetworkType, string> = new Map<
    NetworkType,
    string
  >([]);
  public async receiveTokens(
    networkType: NetworkType,
    tokenAddress: string,
    amount: string,
    config?: TransactionConfig,
  ): Promise<string> {
    const { address, abi } = this.getBridgeData(networkType);
    return network.send(
      networkType,
      address,
      abi,
      'receiveTokens',
      [tokenAddress, amount],
      config,
    );
  }
  public async receiveTokensAt(): Promise<string> {
    return '';
  }

  public getFeePercentage(networkType: NetworkType) {
    const { address, abi } = this.getBridgeData(networkType);
    return network
      .call(networkType, address, abi, 'getFeePercentage', [])
      .then(result => Number(result) / 100);
  }

  /**
   * Get address of 'allowTokens' contract
   * @param networkType
   */
  public async allowTokens(networkType: NetworkType) {
    const cachedAddress = this._bridgeAllowTokensContractMap.get(networkType);
    if (cachedAddress !== undefined) {
      return cachedAddress;
    }
    const { address, abi } = this.getBridgeData(networkType);
    const allowTokensAddress = await network.call(
      networkType,
      address,
      abi,
      'allowTokens',
      [],
    );
    this._bridgeAllowTokensContractMap.set(networkType, allowTokensAddress);
    return allowTokensAddress;
  }

  public async allowTokens_getMin(networkType: NetworkType) {
    const address = await this.allowTokens(networkType);
    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getMinTokensAllowed',
      [],
    );
  }

  public async allowTokens_getMax(networkType: NetworkType) {
    const address = await this.allowTokens(networkType);
    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getMaxTokensAllowed',
      [],
    );
  }

  public async allowTokens_getDailyLimit(networkType: NetworkType) {
    const address = await this.allowTokens(networkType);
    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'dailyLimit',
      [],
    );
  }

  private getBridgeData(
    networkType: NetworkType,
  ): { address: string; abi: AbiItem[] } {
    return {
      address: NetworkDictionary.get(networkType).bridgeContractAddress,
      abi: bridgeAbi as AbiItem[],
    };
  }
}

export const bridge = new Bridge();
