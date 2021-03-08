import {
  take,
  call,
  put,
  takeLatest,
  fork,
  cancel,
  cancelled,
} from 'redux-saga/effects';
import { bignumber } from 'mathjs';
import { eventChannel } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { Wallet, wallet } from 'services/wallet';
import { FormPayload, TxStep } from './types';
import { token } from '../../../services/interactions/token';
import { toWei } from '../../../utils/math';
import { network } from '../../../services';
import { AppMode } from '../../../types';
import { bridge } from '../../../services/interactions/bridge';
import { AssetDictionary } from '../../../dictionaries';

function createWeb3Connection(wallet: Wallet) {
  return eventChannel(emit => {
    const handleConnecting = status => emit(actions.userConnecting(status));
    const handleAddressChange = address =>
      emit(actions.userAddressChanged(address));
    const handleChainChange = value => emit(actions.userChainChanged(value));
    wallet.on('connecting', handleConnecting);
    wallet.on('addressChanged', handleAddressChange);
    wallet.on('chainChanged', handleChainChange);
    return () => {
      wallet.off('connecting', handleAddressChange);
      wallet.off('addressChanged', handleAddressChange);
      wallet.off('chainChanged', handleChainChange);
    };
  });
}

function* watchWalletChannel() {
  const channel = yield call(createWeb3Connection, wallet);
  try {
    while (true) {
      const event = yield take(channel);
      yield put(event);
    }
  } finally {
    channel.close();
  }
}

function* approveTransfer() {
  while (true) {
    const { payload } = yield take(actions.approveTokens.type);

    const nonce = yield call(
      [network, network.nonce],
      payload.sourceNetwork,
      wallet.address,
    );

    try {
      const amountToApprove = toWei(AppMode.TESTNET ? payload.amount : 1000000);

      const approveHash = yield call(
        [token, token.approve],
        payload.sourceNetwork,
        payload.asset,
        amountToApprove,
      );

      yield put(
        actions.confirmTransfer({
          form: payload,
          approveHash,
          nonce: nonce + 1,
        }),
      );
    } catch (e) {
      console.error(e);
      yield put(actions.forceTransferState(TxStep.USER_DENIED));
    }
  }
}

function* confirmTransfer() {
  while (true) {
    const { payload } = yield take(actions.confirmTransfer.type);

    let nonce = payload.nonce;

    if (nonce === undefined) {
      nonce = yield call(
        [network, network.nonce],
        payload.form.sourceNetwork,
        wallet.address,
      );
    }

    try {
      let transferTx;

      const tokenAddress = AssetDictionary.getContractAddress(
        payload.form.sourceNetwork,
        payload.form.asset,
      ) as string;

      if (payload.form.receiver === '') {
        transferTx = yield call(
          [bridge, bridge.receiveTokens],
          payload.form.sourceNetwork,
          tokenAddress,
          toWei(payload.form.amount),
          {
            nonce,
            gas: payload.nonce !== undefined ? 250000 : undefined,
            value: '0',
          },
        );
      } else {
        transferTx = yield call([bridge, bridge.receiveTokensAt]);
      }

      yield put(actions.pendingTransfer(transferTx));
    } catch (e) {
      yield put(actions.forceTransferState(TxStep.USER_DENIED));
    }
  }
}

function* confirmedTransfer() {}

function* pendingTransfer() {}

function* failedTransfer() {}

function* submitTransferSaga({ payload }: PayloadAction<FormPayload>) {
  try {
    yield fork(approveTransfer);
    yield fork(confirmTransfer);
    yield fork(pendingTransfer);
    yield fork(confirmedTransfer);
    yield fork(failedTransfer);

    const allowance = yield call(
      [token, token.allowance],
      payload.sourceNetwork,
      payload.asset,
      wallet.address,
    );

    if (bignumber(allowance).lessThan(toWei(payload.amount))) {
      yield put(actions.approveTokens(payload));
    } else {
      yield put(actions.confirmTransfer({ form: payload }));
    }
  } finally {
    if (yield cancelled()) {
      yield put(actions.closeTransfer());
    }
  }
}

function* watchTransferSaga(payload: PayloadAction<FormPayload>) {
  const task = yield fork(submitTransferSaga, payload);
  yield take(actions.closeTransfer.type);
  yield cancel(task);
}

function* cancelTransfer() {
  yield put(actions.closeTransfer());
}

export function* bridgePageSaga() {
  yield takeLatest(actions.init.type, watchWalletChannel);

  yield takeLatest(actions.submitTransfer.type, watchTransferSaga);
  yield takeLatest(actions.userAddressChanged.type, cancelTransfer);
  yield takeLatest(actions.userChainChanged.type, cancelTransfer);
}
