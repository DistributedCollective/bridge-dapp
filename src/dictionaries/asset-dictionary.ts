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
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.getContractAddress(network);
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
      return item.getTokenContractAddress(network);
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

  public static getSymbol(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.getSymbol(network);
    }
    return undefined;
  }

  public static isNativeCoin(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return (
        item.nativeCoins.get(NetworkDictionary.getChainId(network)) || false
      );
    }
    return false;
  }

  public static getDecimals(
    network: NetworkType,
    sideNetwork: NetworkType,
    asset: Asset,
  ) {
    const item = this.get(network, sideNetwork, asset);
    if (item) {
      return item.getDecimals(network);
    }
    return undefined;
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
