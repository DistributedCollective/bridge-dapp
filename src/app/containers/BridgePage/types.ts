/* --- STATE --- */
import type { Asset, NetworkChainId, NetworkType } from '../../../types';

export interface BridgePageState {
  address: string;
  connecting: boolean;
  networkType: NetworkType;
  sideNetworkType: NetworkType;
  networkChain: NetworkChainId;
  blockNumber: number;
  tx: TxState;
}

export type ContainerState = BridgePageState;

export interface TxState {
  loading: boolean;
  hash: string;
  approveHash: string;
  step: TxStep;
  payload: FormPayload;
}

export enum TxStep {
  NONE,
  MAIN,
  APPROVE,
  CONFIRM_TRANSFER,
  PENDING_TRANSFER,
  COMPLETED_TRANSFER,
  FAILED_TRANSFER,
  USER_DENIED,
}

export interface FormPayload {
  sourceNetwork: NetworkType;
  targetNetwork: NetworkType;
  asset: Asset;
  amount: string;
  receiver: string;
}
