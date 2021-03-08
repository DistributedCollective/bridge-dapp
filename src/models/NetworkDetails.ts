import { AppMode, NetworkChainId, NetworkType } from '../types';

export class NetworkDetails {
  public bridgeContractAddress: string;
  constructor(
    public network: NetworkType,
    public mode: AppMode,
    public chainId: NetworkChainId,
    public name: string,
    public image: string,
    public nodeUrl: string,
    bridgeContractAddress: string,
    public explorerTx: string,
    public explorerAdr: string,
  ) {
    this.bridgeContractAddress = bridgeContractAddress.toLowerCase();
  }
}
