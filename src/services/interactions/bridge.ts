import { AbiItem } from 'web3-utils';
import { TransactionConfig } from 'web3-core';
import { NetworkType } from 'types';
import { network } from 'services';
import { BridgeDictionary } from 'dictionaries';
import bridgeAbi from 'assets/abi/BridgeAbi.json';
import allowTokensAbi from 'assets/abi/AllowTokensAbi.json';

class Bridge {
  private _bridgeAllowTokensContractMap: Map<string, string> = new Map<
    string,
    string
  >([]);
  public async receiveTokens(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    tokenAddress: string,
    amount: string,
    config?: TransactionConfig,
  ): Promise<string> {
    const { address, abi } = this.getBridgeData(networkType, sideNetworkType);
    return network.send(
      networkType,
      address,
      abi,
      'receiveTokens',
      [tokenAddress, amount],
      config,
    );
  }

  public async receiveTokensAt(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    tokenAddress: string,
    amount: string,
    receiver: string,
    config?: TransactionConfig,
  ): Promise<string> {
    const { address, abi } = this.getBridgeData(networkType, sideNetworkType);
    return network.send(
      networkType,
      address,
      abi,
      'receiveTokensAt',
      [tokenAddress, amount, receiver, '0x'],
      config,
    );
  }

  public getFeePercentage(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
  ) {
    const { address, abi } = this.getBridgeData(networkType, sideNetworkType);
    return network
      .call(networkType, address, abi, 'getFeePercentage', [])
      .then(result => Number(result) / 100);
  }

  /**
   * Get address of 'allowTokens' contract
   */
  public async allowTokens(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
  ) {
    const cachedAddress = this._bridgeAllowTokensContractMap.get(
      `${networkType}-${sideNetworkType}`,
    );

    if (cachedAddress !== undefined) {
      return cachedAddress;
    }
    const { address, abi } = this.getBridgeData(networkType, sideNetworkType);
    const allowTokensAddress = await network.call(
      networkType,
      address,
      abi,
      'allowTokens',
      [],
    );
    this._bridgeAllowTokensContractMap.set(
      `${networkType}-${sideNetworkType}`,
      allowTokensAddress,
    );
    return allowTokensAddress;
  }

  public async allowTokens_getMin(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
  ) {
    const address = await this.allowTokens(networkType, sideNetworkType);

    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getMinTokensAllowed',
      [],
    );
  }

  public async allowTokens_getMax(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
  ) {
    const address = await this.allowTokens(networkType, sideNetworkType);
    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getMaxTokensAllowed',
      [],
    );
  }

  public async allowTokens_getDailyLimit(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
  ) {
    const address = await this.allowTokens(networkType, sideNetworkType);
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
    sideNetworkType: NetworkType,
  ): { address: string; abi: AbiItem[] } {
    return {
      address: BridgeDictionary.get(networkType, sideNetworkType)
        .bridgeContractAddress,
      abi: bridgeAbi as AbiItem[],
    };
  }
}

export const bridge = new Bridge();
