export class BabelFishDetails {
  constructor(
    public readonly rskContractAddress: string,
    public readonly rskAggregatorAddress: string,
    public readonly rskAssetName: string,
  ) {
    this.rskContractAddress = rskContractAddress.toLowerCase();
    this.rskAggregatorAddress = rskAggregatorAddress.toLowerCase();
  }
}
