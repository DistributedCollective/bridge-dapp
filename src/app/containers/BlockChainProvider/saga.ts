import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ChainId } from './types';
import { walletConnection } from './web3-modal';

function* setupSaga({ payload }: PayloadAction<ChainId>) {
  walletConnection.init(payload);
  yield put(actions.setupCompleted());
}

function* connectedSaga({ payload }: PayloadAction<{ address: string }>) {
  yield put(actions.accountChanged(payload.address));
}

function* disconnectSaga() {
  yield call([walletConnection, walletConnection.disconnect]);
}

export function* blockChainProviderSaga() {
  yield takeLatest(actions.setup.type, setupSaga);
  yield takeLatest(actions.connected.type, connectedSaga);
  yield takeLatest(actions.disconnect.type, disconnectSaga);
}
