import Web3 from 'web3';
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';
import { bignumber } from 'mathjs';
import { eventChannel } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { Wallet, wallet } from 'services/wallet';
import { FormPayload, TxStep } from './types';
import { token } from '../../../services/interactions/token';
import { toWei } from '../../../utils/math';
import { network } from '../../../services';
import { AppMode, Asset, NetworkType } from '../../../types';
import { bridge } from '../../../services/interactions/bridge';
import { AssetDictionary, BridgeDictionary } from '../../../dictionaries';
import { selectBridgePage } from './selectors';
import { babelFishService } from '../../../services/interactions/babelfish';

const web3 = new Web3();
const abiCoder = web3.eth.abi;

function getSpenderAddress(payload: {
  sourceNetwork: NetworkType;
  targetNetwork: NetworkType;
  asset: Asset;
}) {
  const asset = AssetDictionary.get(
    payload.sourceNetwork,
    payload.targetNetwork,
    payload.asset,
  );

  if (payload.sourceNetwork === NetworkType.RSK) {
    return asset?.aggregatorData.bridgeTokenAddress;
  }
  return undefined;
}

function createWeb3Connection(wallet: Wallet) {
  return eventChannel(emit => {
    const handleConnecting = status => emit(actions.userConnecting(status));
    const handleAddressChange = async address => {
      let accounts = [address];
      try {
        accounts = await wallet.web3.eth.getAccounts();
      } catch (e) {}
      emit(actions.userAddressChanged(address || accounts[0] || ''));
    };
    const handleChainChange = value => emit(actions.userChainChanged(value));
    wallet.on('connecting', handleConnecting);
    wallet.on('addressChanged', handleAddressChange);
    wallet.on('chainChanged', handleChainChange);
    return () => {
      wallet.off('connecting', handleConnecting);
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
      const amountToApprove = toWei(
        AppMode.TESTNET ? payload.amount : 1000000,
        payload.asset,
        payload.sourceNetwork,
      );

      const approveHash = yield call(
        [token, token.approve],
        payload.sourceNetwork,
        payload.targetNetwork,
        payload.asset,
        amountToApprove,
        getSpenderAddress(payload),
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
        payload.form.targetNetwork,
        payload.form.asset,
      ) as string;

      const isNative = AssetDictionary.isNativeCoin(
        payload.form.sourceNetwork,
        payload.form.targetNetwork,
        payload.form.asset,
      );

      const tokenAmount = toWei(
        payload.form.amount,
        payload.form.asset,
        payload.form.sourceNetwork,
        payload.form.targetNetwork,
      );

      const asset = AssetDictionary.get(
        payload.form.sourceNetwork,
        payload.form.targetNetwork,
        payload.form.asset,
      );

      const receiverAddress = (payload.form.receiver === ''
        ? wallet.address
        : payload.form.receiver
      ).toLowerCase();

      if (payload.form.sourceNetwork === NetworkType.RSK) {
        let basset = (
          AssetDictionary.getContractAddressForRsk(
            payload.form.sourceNetwork,
            payload.form.targetNetwork,
            payload.form.asset,
            payload.form.targetAsset,
          ) || tokenAddress
        ).toLowerCase();
        transferTx = yield call(
          [babelFishService, babelFishService.redeemToBridge],
          payload.form.sourceNetwork,
          payload.form.targetNetwork,
          payload.form.asset,
          payload.form.targetAsset,
          basset,
          tokenAmount,
          receiverAddress,
          BridgeDictionary.get(
            payload.form.sourceNetwork,
            payload.form.targetNetwork,
          ).bridgeContractAddress,
        );
      } else {
        let receiver = receiverAddress;
        let extraData: string | undefined = undefined;

        if (payload.form.targetNetwork === NetworkType.RSK) {
          receiver = asset?.aggregatorData.aggregatorContractAddress;
          extraData = abiCoder.encodeParameter('address', receiverAddress);
        }

        if (isNative) {
          const value = isNative ? tokenAmount : '0';
          transferTx = yield call(
            [bridge, bridge.receiveEthAt],
            payload.form.sourceNetwork,
            payload.form.targetNetwork,
            tokenAmount,
            receiver,
            extraData || '0x',
            {
              nonce,
              gas: payload.nonce !== undefined ? 250000 : undefined,
              value,
            },
          );
        } else {
          transferTx = yield call(
            [bridge, bridge.receiveTokensAt],
            payload.form.sourceNetwork,
            payload.form.targetNetwork,
            tokenAddress,
            tokenAmount,
            receiver,
            extraData,
            {
              nonce,
              gas: payload.nonce !== undefined ? 250000 : undefined,
            },
          );
        }
      }

      yield put(actions.pendingTransfer(transferTx));
    } catch (e) {
      console.error(e);
      yield put(actions.forceTransferState(TxStep.USER_DENIED));
    }
  }
}

function* confirmedTransfer() {}

function* pendingTransfer() {
  while (true) {
    yield take(actions.pendingTransfer.type);
    yield call(watchPendingTransaction);
  }
}

function* failedTransfer() {}

function* submitTransferSaga({ payload }: PayloadAction<FormPayload>) {
  try {
    yield fork(approveTransfer);
    yield fork(confirmTransfer);
    yield fork(pendingTransfer);
    yield fork(confirmedTransfer);
    yield fork(failedTransfer);

    if (
      AssetDictionary.isNativeCoin(
        payload.sourceNetwork,
        payload.targetNetwork,
        payload.asset,
      )
    ) {
      yield put(actions.confirmTransfer({ form: payload }));
      return;
    }

    const allowance = yield call(
      [token, token.allowance],
      payload.sourceNetwork,
      payload.targetNetwork,
      payload.asset,
      wallet.address,
      getSpenderAddress(payload),
    );

    if (
      bignumber(allowance).lessThan(
        toWei(payload.amount, payload.asset, payload.sourceNetwork),
      )
    ) {
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

function* watchPendingTransaction() {
  let check = true;
  while (check) {
    const { tx } = yield select(selectBridgePage);
    const state = yield call(
      [network, network.receipt],
      tx.payload.sourceNetwork,
      tx.hash,
    );
    if (state && state.status) {
      yield put(actions.confirmedTransfer());
      check = false;
    } else if (state && !state.status) {
      yield put(actions.failedTransfer());
      check = false;
    } else {
      yield delay(5000);
    }
  }
}

function* watchBlockChanges({ payload }: PayloadAction<NetworkType>) {
  try {
    if (wallet.isConnected()) {
      yield call([wallet, wallet.changeChain], payload);
    }
  } catch (e) {}

  while (true) {
    const block = yield call([network, network.blockNumber], payload);
    yield put(actions.block(block));
    yield delay(10000);
  }
}

export function* bridgePageSaga() {
  yield takeLatest(actions.init.type, watchWalletChannel);
  yield takeLatest(actions.changeNetwork.type, watchBlockChanges);
  yield takeLatest(actions.submitTransfer.type, watchTransferSaga);
  yield takeLatest(actions.userAddressChanged.type, cancelTransfer);
  yield takeLatest(actions.userChainChanged.type, cancelTransfer);
}
