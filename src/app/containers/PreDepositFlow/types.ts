/* --- STATE --- */
export interface PreDepositFlowState {
  step: Step;
  email: string;
  rskAddress: string;
  depositAddress: string;
  ready: boolean;
  totalDeposits: number;
  tx: DepositTx;
  redeemState: RedeemStep;
  addressState: AddressStep;
  hsitory: DepositHistory[];
}

export type ContainerState = PreDepositFlowState;

export enum Step {
  MAIN,
  LOADER,
  WAITLIST,
  NOTICE,
  CONNECT,
  DEPOSIT_WALLET,
  DEPOSIT_PENDING,
}

export enum RedeemStep {
  NONE,
  MAIN,
  FORM,
  LOADING,
  COMPLETED,
}

export enum AddressStep {
  NONE,
  MAIN,
  LOADING,
  COMPLETED,
}

export interface GenerateAddressResponse {
  id: number;
  btcadr: string;
  web3adr: string;
  email: string;
  label: string;
  name: string;
  dateAdded: number;
}

export interface SubmitEmailResponse {
  new: boolean;
  user: GenerateAddressResponse;
}

export interface DepositTx {
  status: string;
  txHash: string;
  value: string;
}

export interface RedeemForm {
  address: string;
  signature: string;
  message: string;
}

export interface AddressForm {
  currentAddress: string;
  newAddress: string;
  timestamp: number;
  signature: string;
}

export interface DepositHistory {
  btcadr: string;
  dateAdded: Date;
  id: number;
  status: string;
  txHash: string;
  type: string;
  valueBtc: number;
  valueUsd: number;
  web3adr: string;
}
