import type { NetworkChainId, NetworkType } from '../types';
import type { AssetDetails } from './AssetDetails';

export class BridgeDetails {
  constructor(
    public network: NetworkType,
    public mainChainId: NetworkChainId,
    public sideChainId: NetworkChainId,
    public bridgeContractAddress: string,
    public assets: AssetDetails[],
  ) {
    this.bridgeContractAddress = bridgeContractAddress.toLowerCase();
  }
}
