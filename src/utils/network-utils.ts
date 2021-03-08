import { AppMode } from 'types';

export const APP_MODE =
  process.env.REACT_APP_MODE === 'mainnet' ? AppMode.MAINNET : AppMode.TESTNET;
