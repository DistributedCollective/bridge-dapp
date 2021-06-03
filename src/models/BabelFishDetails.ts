import { Asset } from '../types';

export class BabelFishDetails {
  constructor(
    public readonly aggregatorContractAddress: string,
    public readonly bridgeTokenAddress: string,
    public readonly isMinting: boolean,
    public readonly aggregatedTokens: Asset[],
  ) {
    this.bridgeTokenAddress = bridgeTokenAddress.toLowerCase();
    this.aggregatorContractAddress = aggregatorContractAddress.toLowerCase();
  }
}
