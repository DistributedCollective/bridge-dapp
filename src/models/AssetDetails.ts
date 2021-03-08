import { Asset, NetworkChainId } from '../types';

export class AssetDetails {
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
}
