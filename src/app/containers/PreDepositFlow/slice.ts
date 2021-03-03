import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  AddressForm,
  AddressStep,
  ContainerState,
  DepositTx,
  GenerateAddressResponse,
  RedeemForm,
  RedeemStep,
  Step,
  SubmitEmailResponse,
} from './types';
import { showError } from '../../../utils/toaster';
import { errors } from '../../../utils/errors';
import { storage } from '../../../utils/storage';

// The initial state of the PreDepositFlow container
export const initialState: ContainerState = {
  step: Step.LOADER,
  email: '',
  rskAddress: '',
  depositAddress: '',
  ready: false,
  redeemState: RedeemStep.NONE,
  addressState: AddressStep.NONE,
  totalDeposits: Number(storage.get('deposit-count', '0')),
  tx: {
    status: '',
    txHash: '',
    value: '',
  },
  hsitory: [],
};

const preDepositFlowSlice = createSlice({
  name: 'preDepositFlow',
  initialState,
  reducers: {
    init(state) {
      state.ready = false;
      state.step = Step.LOADER;
    },
    ready(state) {
      state.ready = true;
      state.step = Step.MAIN;
    },
    submitEmail(state, { payload }: PayloadAction<string>) {
      state.step = Step.LOADER;
      state.email = payload;
    },
    submitEmailSuccess(state, { payload }: PayloadAction<SubmitEmailResponse>) {
      state.step = Step.NOTICE;
      if (!payload.new && payload.user) {
        state.rskAddress = payload.user.web3adr;
        state.depositAddress = payload.user.btcadr;
      }
    },
    submitEmailFailed(state, { payload }: PayloadAction<string>) {
      if (payload === 'email_not_found') {
        state.step = Step.WAITLIST;
      } else {
        showError(errors[payload]);
        state.step = Step.MAIN;
      }
    },
    acceptNotice(state) {
      if (state.depositAddress && state.rskAddress) {
        state.step = Step.DEPOSIT_WALLET;
      } else {
        state.step = Step.CONNECT;
      }
    },
    generateDepositAddress(state, { payload }: PayloadAction<string>) {
      state.step = Step.LOADER;
    },
    generateDepositAddressSuccess(
      state,
      { payload }: PayloadAction<GenerateAddressResponse>,
    ) {
      state.step = Step.DEPOSIT_WALLET;
      state.rskAddress = payload.web3adr;
      state.depositAddress = payload.btcadr;
    },
    generateDepositAddressFailed(state, { payload }: PayloadAction<string>) {
      showError(errors[payload]);
      state.step = Step.CONNECT;
    },
    updateDepositTx(state, { payload }: PayloadAction<DepositTx>) {
      state.step = Step.DEPOSIT_PENDING;
      state.tx = payload;
    },
    getTotalDeposits() {},
    getTotalDepositsSuccess(state, { payload }: PayloadAction<number>) {
      state.totalDeposits = payload;
      storage.set('deposit-count', String(state.totalDeposits));
    },
    userRedeem(state, { payload }: PayloadAction<RedeemForm>) {
      state.redeemState = RedeemStep.LOADING;
    },
    userRedeemSuccess(state) {
      state.redeemState = RedeemStep.COMPLETED;
    },
    userRedeemFailed(state, { payload }: PayloadAction<string>) {
      showError(payload);
      state.redeemState = RedeemStep.FORM;
    },
    setRedeemStep(state, { payload }: PayloadAction<RedeemStep>) {
      state.redeemState = payload;
    },
    getDepositHistory(state, { payload }: PayloadAction<string>) {},
    getDepositHistorySuccess(state, { payload }: PayloadAction<any>) {
      state.hsitory = payload;
    },

    setAddressStep(state, { payload }: PayloadAction<AddressStep>) {
      state.addressState = payload;
    },
    userChangeAddress(state, { payload }: PayloadAction<AddressForm>) {
      state.addressState = AddressStep.LOADING;
    },
    userChangedAddressSuccess(state) {
      state.addressState = AddressStep.COMPLETED;
    },
    userChangedAddressFailed(state, { payload }: PayloadAction<string>) {
      showError(payload);
      state.addressState = AddressStep.MAIN;
    },
  },
});

export const { actions, reducer, name: sliceKey } = preDepositFlowSlice;
