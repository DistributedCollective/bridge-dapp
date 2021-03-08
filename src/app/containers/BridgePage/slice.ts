import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { Asset, NetworkChainId, NetworkType } from 'types';
import { wallet } from 'services/wallet';
import { NetworkDictionary } from 'dictionaries';
import { ContainerState, FormPayload, TxStep } from './types';

// The initial state of the BridgePage container
export const initialState: ContainerState = {
  address: wallet.address,
  connecting: false,
  networkType: wallet.networkType,
  networkChain: wallet.chainId,
  tx: {
    step: TxStep.NONE,
    loading: false,
    hash: '',
    approveHash: '',
    payload: {
      asset: Asset.BTC,
      amount: '',
      receiver: '',
      sourceNetwork: NetworkType.RSK,
      targetNetwork: NetworkType.ETH,
    },
  },
};

const bridgePageSlice = createSlice({
  name: 'bridgePage',
  initialState,
  reducers: {
    init(state) {},
    userConnecting(state, { payload }: PayloadAction<boolean>) {
      state.connecting = payload;
    },
    userAddressChanged(state, { payload }: PayloadAction<string>) {
      state.address = payload;
    },
    userChainChanged(state, { payload }: PayloadAction<NetworkChainId>) {
      state.networkChain = payload;
      state.networkType = (NetworkDictionary.getByChainId(payload)
        ?.network as unknown) as NetworkType;
    },

    submitTransfer(state, { payload }: PayloadAction<FormPayload>) {
      state.tx.loading = true;
      state.tx.step = TxStep.MAIN;
      state.tx.payload = payload;
      state.tx.hash = '';
      state.tx.approveHash = '';
    },

    approveTokens(state, { payload }: PayloadAction<FormPayload>) {
      state.tx.loading = true;
      state.tx.step = TxStep.APPROVE;
      state.tx.payload = payload;
      state.tx.hash = '';
      state.tx.approveHash = '';
    },

    confirmTransfer(
      state,
      {
        payload,
      }: PayloadAction<{
        form: FormPayload;
        approveHash?: string;
        nonce?: number;
      }>,
    ) {
      state.tx.loading = true;
      state.tx.step = TxStep.CONFIRM_TRANSFER;
      state.tx.payload = payload.form;
      state.tx.hash = '';
      state.tx.approveHash = payload.approveHash || '';
    },

    pendingTransfer(state, { payload }: PayloadAction<string>) {
      state.tx.step = TxStep.PENDING_TRANSFER;
      state.tx.hash = payload;
    },

    confirmedTransfer() {},

    failedTransfer() {},

    forceTransferState(state, { payload }: PayloadAction<TxStep>) {
      state.tx.loading = false;
      state.tx.step = payload;
    },

    closeTransfer(state) {
      state.tx.loading = false;
      state.tx.step = TxStep.NONE;
      state.tx.hash = '';
      state.tx.approveHash = '';
      state.tx.payload.amount = '';
      state.tx.payload.asset = Asset.BTC;
      state.tx.payload.receiver = '';
      state.tx.payload.sourceNetwork = NetworkType.RSK;
      state.tx.payload.targetNetwork = NetworkType.ETH;
    },
  },
});

export const { actions, reducer, name: sliceKey } = bridgePageSlice;
