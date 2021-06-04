import { Asset, NetworkChainId, NetworkType } from '../types';
import { NetworkDictionary } from '../dictionaries';
import { BabelFishDetails } from './BabelFishDetails';
import massetAbi from 'assets/abi/BabelFish_MassetAbi.json';
import erc20Abi from 'assets/abi/ERC20Abi.json';

// min, max, fee, daily limit
type Limits = [
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
];

export class AssetDetails {
  public limits: Map<NetworkChainId, Limits> = new Map<
    NetworkChainId,
    Limits
  >();
  constructor(
    public readonly asset: Asset,
    public readonly symbol: string,
    public readonly name,
    public readonly image: string,
    public readonly decimals: number,
    public readonly tokenContractAddress: string,
    public readonly isNative: boolean = false,
    public readonly aggregatorData: BabelFishDetails,
  ) {
    this.tokenContractAddress = this.tokenContractAddress.toLowerCase();
  }
  public toString() {
    return String(this.asset);
  }

  public getTokenContractAbi(networkType: NetworkType) {
    if (
      networkType === NetworkType.RSK &&
      this.aggregatorData.bridgeTokenAddress
    )
      return massetAbi;
    return erc20Abi;
  }
  public getAggregatorContractAddress(networkType: NetworkType) {
    if (
      networkType === NetworkType.RSK &&
      this.aggregatorData.aggregatorContractAddress
    )
      return this.aggregatorData.aggregatorContractAddress;
    return undefined;
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
}
