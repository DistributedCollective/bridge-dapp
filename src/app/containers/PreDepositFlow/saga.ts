import { eventChannel } from 'redux-saga';
import { take, call, put, takeLatest, fork, select } from 'redux-saga/effects';
import io from 'socket.io-client';
import { actions } from './slice';
import { saleBackend } from '../BlockChainProvider/classifiers';
import { selectBlockChainProvider } from '../BlockChainProvider/selectors';
import { selectPreDepositFlow } from './selectors';
import { DEFAULT_CHAIN } from '../../../utils/helpers';

function createSocketConnection() {
  const { origin, pathname } = new URL(saleBackend[DEFAULT_CHAIN]);
  const socket = io(`${origin}/`, {
    reconnectionDelayMax: 10000,
    path: pathname && pathname !== '/' ? pathname : '',
  });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function createWebSocketChannel(socket) {
  return eventChannel(emit => {
    socket.on('depositTx', deposit => emit(actions.updateDepositTx(deposit)));
    socket.on('getDeposits', deposit => console.log(deposit));
    return () => {
      socket.off('depositTx');
      socket.disconnect();
    };
  });
}

const submitEmailRequest = (socket, email) =>
  new Promise(resolve => {
    socket.emit('submitEmail', email, (error, success) => {
      resolve({ error: error?.error || null, success });
    });
  });

function* submitEmail(socket) {
  while (true) {
    const { payload } = yield take(actions.submitEmail.type);
    const { error, success } = yield call(submitEmailRequest, socket, payload);
    if (error) {
      yield put(actions.submitEmailFailed(error));
    }
    if (success) {
      yield put(actions.submitEmailSuccess(success));
    }
  }
}

const getTotalDepositsRequest = socket =>
  new Promise(resolve => {
    socket.emit('getTotalDeposits', data => resolve(data));
  });

function* getTotalDeposits(socket) {
  while (true) {
    yield take(actions.getTotalDeposits.type);
    const amount = yield call(getTotalDepositsRequest, socket);
    yield put(actions.getTotalDepositsSuccess(amount));
  }
}

const getDepositHistoryRequest = (socket, address) =>
  new Promise(resolve => {
    socket.emit('getDepositHistory', address, data => resolve(data));
  });

function* getDepositHistory(socket) {
  while (true) {
    const { payload } = yield take(actions.getDepositHistory.type);
    const transactions = yield call(getDepositHistoryRequest, socket, payload);
    yield put(actions.getDepositHistorySuccess(transactions));
  }
}

const getBtcAddressRequest = (socket, address, email) =>
  new Promise(resolve => {
    socket.emit('getDepositAddress', address, email, (err, res) => {
      resolve({ err, res });
    });
  });

function* generateDepositAddress(socket) {
  while (true) {
    const { payload } = yield take(actions.generateDepositAddress.type);
    const { address } = yield select(selectBlockChainProvider);
    if (payload.toLowerCase() !== address.toLowerCase()) {
      yield put(actions.generateDepositAddressFailed('generation_problem'));
      return;
    }
    const { email } = yield select(selectPreDepositFlow);
    const { res, err } = yield call(
      getBtcAddressRequest,
      socket,
      address,
      email,
    );
    if (res && res.btcadr) {
      yield put(actions.generateDepositAddressSuccess(res));
    } else {
      yield put(actions.generateDepositAddressFailed(err));
    }
  }
}

const userRedeemRequest = (socket, address, signature, message) =>
  new Promise(resolve => {
    socket.emit('userRedeem', address, signature, message, (err, res) => {
      resolve({ err, res });
    });
  });

function* userRedeem(socket) {
  while (true) {
    const { payload } = yield take(actions.userRedeem.type);
    const { address, signature, message } = payload;
    const { res, err } = yield call(
      userRedeemRequest,
      socket,
      address,
      signature,
      message,
    );
    if (res) {
      yield put(actions.userRedeemSuccess());
    } else {
      yield put(actions.userRedeemFailed(err.error || 'Something went wrong.'));
    }
  }
}

const userChangeAddressRequest = (
  socket,
  currentAddress,
  newAddress,
  timestamp,
  signature,
) =>
  new Promise(resolve => {
    socket.emit(
      'userChangeAddress',
      currentAddress,
      newAddress,
      timestamp,
      signature,
      (err, res) => {
        resolve({ err, res });
      },
    );
  });

function* userChangeAddress(socket) {
  while (true) {
    const { payload } = yield take(actions.userChangeAddress.type);
    const { currentAddress, newAddress, timestamp, signature } = payload;
    const { res, err } = yield call(
      userChangeAddressRequest,
      socket,
      currentAddress,
      newAddress,
      timestamp,
      signature,
    );
    if (res) {
      yield put(actions.userChangedAddressSuccess());
    } else {
      yield put(
        actions.userChangedAddressFailed(err.error || 'Something went wrong.'),
      );
    }
  }
}

function* watchSocketChannel() {
  const socket = yield call(createSocketConnection);
  yield fork(submitEmail, socket);
  yield fork(generateDepositAddress, socket);
  yield fork(getTotalDeposits, socket);
  yield fork(userRedeem, socket);
  yield fork(getDepositHistory, socket);
  yield fork(userChangeAddress, socket);

  const blockChannel = yield call(createWebSocketChannel, socket);
  try {
    yield put(actions.ready());
    while (true) {
      const event = yield take(blockChannel);
      yield put(event);
    }
  } finally {
    blockChannel.close();
  }
}

export function* preDepositFlowSaga() {
  yield takeLatest(actions.init.type, watchSocketChannel);
}
