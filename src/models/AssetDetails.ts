import { Asset, NetworkChainId, NetworkType } from '../types';
import { NetworkDictionary } from '../dictionaries';

export class AssetDetails {
  public symbols: Map<NetworkChainId, string> = new Map<
    NetworkChainId,
    string
  >();
  public decimalMap: Map<NetworkChainId, number> = new Map<
    NetworkChainId,
    number
  >();
  public nativeCoins: Map<NetworkChainId, boolean> = new Map<
    NetworkChainId,
    boolean
  >();
  constructor(
    public asset: Asset,
    public symbol: string,
    public name,
    public image: string,
    public decimals: number,
    public contracts: Map<NetworkChainId, string>,
  ) {}
  public toString() {
    return String(this.asset);
  }
  public setSymbols(items: Map<NetworkChainId, string>) {
    this.symbols = items;
    return this;
  }
  public getSymbol(networkType: NetworkType) {
    const chainId = NetworkDictionary.getChainId(networkType);
    return this.symbols.get(chainId) || this.symbol;
  }
  public setNativeCoins(items: Map<NetworkChainId, boolean>) {
    this.nativeCoins = items;
    return this;
  }
  public isNativeCoin(networkType: NetworkType) {
    const chainId = NetworkDictionary.getChainId(networkType);
    return this.nativeCoins.get(chainId) || false;
  }
  public setDecimals(items: Map<NetworkChainId, number>) {
    this.decimalMap = items;
    return this;
  }
  public getDecimals(networkType: NetworkType) {
    const chainId = NetworkDictionary.getChainId(networkType);
    return this.decimalMap.get(chainId) || this.decimals;
  }
}
