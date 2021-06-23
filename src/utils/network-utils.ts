import { AppMode } from 'types';

export const APP_MODE =
  process.env.REACT_APP_MODE === 'mainnet' ? AppMode.MAINNET : AppMode.TESTNET;

export const backendUrl = {
  [AppMode.MAINNET]: 'https://backend.sovryn.app',
  [AppMode.TESTNET]: 'https://api.test.sovryn.app',
};

export const discordInvite = 'https://discord.gg/kBTNx4zjRf'; //unlimited use, no-expiry invite
