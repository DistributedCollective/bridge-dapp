import type { Asset, NetworkChainId, NetworkType } from 'types';
import { NetworkDictionary } from './index';
import { BridgeDictionary } from './bridge-dictionary';
import erc20Abi from 'assets/abi/ERC20Abi.json';

export class AssetDictionary {
  public static list(network: NetworkType, sideNetwork: NetworkType) {
    const mainChainId = NetworkDictionary.getChainId(network);
    const sideChainId = NetworkDictionary.getChainId(sideNetwork);
    if (mainChainId === undefined || sideChainId === undefined) {
      return [];
    }
    return this.listForChainId(mainChainId, sideChainId);
  }

  public static get(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    return this.list(network, sideNetwork).find(item => item.asset === asset);
  }

  public static getForSide(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
    targetAsset: Asset,
  ) {
    const source = this.get(network, sideNetwork, asset);
    if (
      source &&
      source.aggregatorData.aggregatedTokens.includes(targetAsset)
    ) {
      return this.get(sideNetwork, network, targetAsset);
    }
    return undefined;
  }

  public static listForChainId(
    mainChainId: NetworkChainId,
    sideChainId: NetworkChainId,
  ) {
    const bridge = BridgeDictionary.getByChainId(mainChainId, sideChainId);
    if (bridge === undefined) {
      return [];
    }
    return bridge.assets;
  }

  public static getContractAddress(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    return this.get(network, sideNetwork, asset)?.aggregatorData
      .bridgeTokenAddress;
  }

  public static getContractAddressForRsk(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
    targetAsset: Asset,
  ) {
    const source = this.get(network, sideNetwork, asset);
    if (source) {
      return source.aggregatorData.bridgeTokenAddresses.get(targetAsset);
    }
    return undefined;
  }

  public static getTokenContractAddress(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.tokenContractAddress;
    }
    return undefined;
  }

  public static getTokenContractAbi(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.getTokenContractAbi(network);
    }
    return erc20Abi;
  }

  public static getAggregatorContractAddress(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.getAggregatorContractAddress(network);
    }
    return undefined;
  }

  public static getSymbol(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    return this.get(network, sideNetwork, asset)?.symbol;
  }

  public static isNativeCoin(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    return this.get(network, sideNetwork, asset)?.isNative || false;
  }

  public static getDecimals(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    return this.get(network, sideNetwork, asset)?.decimals || 18;
  }

  public static getLimits(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.getLimits(network);
    }
    return undefined;
  }
}
