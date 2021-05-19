import { Asset, NetworkChainId, NetworkType } from '../types';
import { NetworkDictionary } from '../dictionaries';
import { BabelFishDetails } from './BabelFishDetails';

// min, max, fee, daily limit
type Limits = [
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
];

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
  public limits: Map<NetworkChainId, Limits> = new Map<
    NetworkChainId,
    Limits
  >();
  public babelFishDetails?: BabelFishDetails;
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
    if (networkType === NetworkType.RSK && this.getBabelFish()?.rskAssetName)
      return this.getBabelFish()?.rskAssetName;
    const chainId = NetworkDictionary.getChainId(networkType);
    return this.symbols.get(chainId) || this.symbol;
  }
  /**
   * Get bridged token contract address, ignore babelfish
   * @param networkType
   */
  public getContractAddress(networkType: NetworkType) {
    return this.contracts.get(NetworkDictionary.getChainId(networkType));
  }
  /**
   * Get actual contract address
   * @param networkType
   */
  public getTokenContractAddress(networkType: NetworkType) {
    if (
      networkType === NetworkType.RSK &&
      this.getBabelFish()?.rskContractAddress
    )
      return this.getBabelFish()?.rskContractAddress;
    return this.getContractAddress(networkType);
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
  public setLimits(items: Map<NetworkChainId, Limits>) {
    this.limits = items;
    return this;
  }
  public getLimits(networkType: NetworkType) {
    const chainId = NetworkDictionary.getChainId(networkType);
    const limits = this.limits.get(chainId);
    if (limits) {
      return {
        min: limits[0],
        max: limits[1],
        fee: limits[2],
        daily: limits[3],
      };
    }
    return undefined;
  }
  public setBabelFish(details: BabelFishDetails) {
    this.babelFishDetails = details;
    return this;
  }
  public getBabelFish() {
    return this.babelFishDetails;
  }
}
