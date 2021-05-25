import { AbiItem } from 'web3-utils';
import { TransactionConfig } from 'web3-core';
import { Asset, NetworkType } from 'types';
import { network } from 'services';
import { AssetDictionary, BridgeDictionary } from 'dictionaries';
import bridgeAbi from 'assets/abi/BridgeAbi.json';
import bridgeAbiTestnet from 'assets/abi/BridgeAbi_testnet.json';
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
    data: string = '0x',
    config?: TransactionConfig,
  ): Promise<string> {
    const { address, abi } = this.getBridgeData(networkType, sideNetworkType);
    return network.send(
      networkType,
      address,
      abi,
      'receiveTokensAt',
      [tokenAddress, amount, receiver, data],
      config,
    );
  }

  public async receiveEthAt(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    amount: string,
    receiver: string,
    data: string = '0x',
    config?: TransactionConfig,
  ): Promise<string> {
    const { address, abi } = this.getBridgeData(networkType, sideNetworkType);
    if (!config) {
      config = {};
    }
    config.value = amount;
    return network.send(
      networkType,
      address,
      abi,
      process.env.REACT_APP_MODE === 'testnet' // testnet has typo in contract function name
        ? 'recieveEthAt'
        : 'receiveEthAt',
      [receiver, data],
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

  public async getFeePerToken(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ) {
    const address = await this.allowTokens(networkType, sideNetworkType);
    const token = AssetDictionary.getContractAddress(
      networkType,
      sideNetworkType,
      asset,
    ) as string;
    return network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getFeePerToken',
      [token],
    );
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

  public async allowTokens_getMinPerToken(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ) {
    const address = await this.allowTokens(networkType, sideNetworkType);
    const token = AssetDictionary.getContractAddress(
      networkType,
      sideNetworkType,
      asset,
    ) as string;

    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getMinPerToken',
      [token],
    );
  }

  public async allowTokens_getMaxPerToken(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ) {
    const address = await this.allowTokens(networkType, sideNetworkType);
    const token = AssetDictionary.getContractAddress(
      networkType,
      sideNetworkType,
      asset,
    ) as string;

    return await network.call(
      networkType,
      address,
      allowTokensAbi as AbiItem[],
      'getMaxPerToken',
      [token],
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
      abi: (process.env.REACT_APP_MODE === 'testnet' // testnet has typo in the contract function
        ? bridgeAbiTestnet
        : bridgeAbi) as AbiItem[],
    };
  }
}

export const bridge = new Bridge();
