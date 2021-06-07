import { AppMode, NetworkChainId, NetworkType } from '../types';

export class NetworkDetails {
  constructor(
    public network: NetworkType,
    public mode: AppMode,
    public chainId: NetworkChainId,
    public name: string,
    public readonly longName: string,
    public readonly coinName: string,
    public readonly coinDecimals: number,
    public image: string,
    public nodeUrl: string,
    public readonly explorer: string,
    public explorerTx: string,
    public explorerAdr: string,
  ) {}
}
