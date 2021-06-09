import type { Asset } from '../types';

export class BabelFishDetails {
  constructor(
    public readonly aggregatorContractAddress: string | false,
    public readonly bridgeTokenAddress: string,
    public readonly isMinting: boolean,
    public readonly aggregatedTokens: Asset[],
    public readonly bridgeTokenAddresses: Map<Asset, string>,
    public readonly version: Asset,
  ) {
    this.bridgeTokenAddress = bridgeTokenAddress.toLowerCase();
    this.aggregatorContractAddress = aggregatorContractAddress
      ? aggregatorContractAddress.toLowerCase()
      : false;
  }
}
