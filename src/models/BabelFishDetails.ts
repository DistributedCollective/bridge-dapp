import type { Asset } from '../types';

export enum BabelFishRedeem {
  DEFAULT,
  RECEIVE_ETH_AT,
  REDEEM,
  REDEEM_WITH_EXTRA_DATA,
}

export class BabelFishDetails {
  constructor(
    public readonly aggregatorContractAddress: string | false,
    public readonly bridgeTokenAddress: string,
    public readonly isMinting: boolean,
    public readonly aggregatedTokens: Asset[],
    public readonly bridgeTokenAddresses: Map<Asset, string>,
    public readonly version: Asset,
    public readonly redeem: BabelFishRedeem = BabelFishRedeem.DEFAULT,
    public readonly customBridge?: string,
  ) {
    this.bridgeTokenAddress = bridgeTokenAddress.toLowerCase();
    this.aggregatorContractAddress = aggregatorContractAddress
      ? aggregatorContractAddress.toLowerCase()
      : false;
  }
}
