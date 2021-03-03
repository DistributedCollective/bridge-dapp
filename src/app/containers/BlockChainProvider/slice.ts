import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ChainId, ContainerState } from './types';
import { DEFAULT_CHAIN } from '../../../utils/helpers';

// The initial state of the BlockChainProvider container
export const initialState: ContainerState = {
  network: DEFAULT_CHAIN === 30 ? 'mainnet' : 'testnet',
  chainId: DEFAULT_CHAIN,
  setupCompleted: false,
  connected: false,
  connecting: false,
  address: '',
};

const blockChainProviderSlice = createSlice({
  name: 'blockChainProvider',
  initialState,
  reducers: {
    setup(state, { payload }: PayloadAction<ChainId>) {
      state.chainId = payload;
      state.network = payload === 30 ? 'mainnet' : 'testnet';
      state.setupCompleted = false;
    },
    setupCompleted(state) {
      state.setupCompleted = true;
    },
    connect(state) {
      state.connecting = true;
    },
    connected(state, { payload }: PayloadAction<{ address: string }>) {
      state.connecting = false;
      state.connected = true;
    },
    disconnect() {},
    disconnected(state) {
      state.connecting = false;
      state.connected = false;
      state.address = '';
      state.network = DEFAULT_CHAIN === 30 ? 'mainnet' : 'testnet';
      state.chainId = DEFAULT_CHAIN;
    },
    accountChanged(state, { payload }: PayloadAction<string>) {
      state.address = payload || '';
    },
    chainChanged(
      state,
      { payload }: PayloadAction<{ chainId: ChainId; networkId: number }>,
    ) {
      state.chainId = payload.chainId;
      state.network = payload.chainId === 30 ? 'mainnet' : 'testnet';
    },
  },
});

export const { actions, reducer, name: sliceKey } = blockChainProviderSlice;
