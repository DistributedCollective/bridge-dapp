import type { NetworkChainId, NetworkType } from '../types';
import type { AssetDetails } from './AssetDetails';

export class BridgeDetails {
  constructor(
    public readonly network: NetworkType,
    public readonly mainChainId: NetworkChainId,
    public readonly sideChainId: NetworkChainId,
    public readonly bridgeContractAddress: string,
    public readonly assets: AssetDetails[],
  ) {
    this.bridgeContractAddress = bridgeContractAddress.toLowerCase();
  }
}
