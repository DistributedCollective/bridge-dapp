import { AppMode, NetworkChainId, NetworkType } from '../types';

export class NetworkDetails {
  constructor(
    public network: NetworkType,
    public mode: AppMode,
    public chainId: NetworkChainId,
    public name: string,
    public image: string,
    public nodeUrl: string,
    public explorerTx: string,
    public explorerAdr: string,
  ) {}
}
